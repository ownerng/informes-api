import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as PizZip from 'pizzip';
import * as Docxtemplater from 'docxtemplater';
import * as path from 'path';
import ImageModule from 'docxtemplater-image-module-free';
import { DocumentDto } from '../../dtos/documents.dto';

@Injectable()
export class DocumentService {
  async generateDocument(
    files: Express.Multer.File[],
    DocumentDto: DocumentDto,
  ): Promise<string> {
    const { fecha, actividad, asistencia, certificado, images } = DocumentDto;

    // Ruta de la plantilla
    const templatePath = path.resolve(__dirname, '../../templates/template.docx');
    const content = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);

    // Configurar el módulo de imágenes
    const imageModule = new ImageModule({
      getImage: (tagValue: string) => fs.readFileSync(path.resolve('./uploads', tagValue)),
      getSize: () => [150, 150],
    });

    const doc = new Docxtemplater(zip, { modules: [imageModule] });

    // Insertar los datos en el documento
    doc.setData({
      fecha,
      actividad,
      asistencia: JSON.parse(asistencia),
      certificado,
      items: JSON.parse(images),
      imagen: files.map(file => file.filename), // Agregar las imágenes
    });

    // Renderizar el documento
    try {
      doc.render();
    } catch (error) {
      throw new Error('Error al generar el documento: ' + error.message);
    }

    // Guardar el archivo generado
    const outputPath = path.resolve(__dirname, '../../output', `document-${Date.now()}.docx`);
    const buf = doc.getZip().generate({ type: 'nodebuffer' });
    fs.writeFileSync(outputPath, buf);

    return outputPath;
  }
}
