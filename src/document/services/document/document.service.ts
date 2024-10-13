import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as PizZip from 'pizzip';
import * as Docxtemplater from 'docxtemplater';
import * as path from 'path';
import ImageModule from 'docxtemplater-image-module-free';
import { DocumentDto } from '../../dtos/documents.dto';
import * as mime from 'mime-types';  // Para identificar el tipo de archivo

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

    // Procesar asistencia y certificado (imágenes o PDF)
    const processedAsistencia = this.processFile(asistencia);
    const processedCertificado = this.processFile(certificado);

    // Insertar los datos en el documento
    doc.setData({
      fecha,
      actividad,
      asistencia: processedAsistencia, // Procesado (imagen o texto si es PDF)
      certificado: processedCertificado, // Procesado (imagen o texto si es PDF)
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

  // Método para procesar archivo de asistencia o certificado
  private processFile(filePath: string): string | Buffer {
    const fullPath = path.resolve('./uploads', filePath);
    const mimeType = mime.lookup(fullPath);

    if (!mimeType) {
      throw new Error('Tipo de archivo no identificado');
    }

    // Si es una imagen, devolvemos el contenido como imagen
    if (mimeType.startsWith('image/')) {
      return fullPath;  // Usaremos el módulo de imágenes para procesarlo
    }

    // Si es un PDF, podrías procesarlo de manera diferente
    if (mimeType === 'application/pdf') {
      return 'Este es un archivo PDF adjunto'; // O convertirlo a imagen
    }

    throw new Error('Tipo de archivo no soportado');
  }
}
