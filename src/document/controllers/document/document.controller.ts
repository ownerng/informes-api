import {
    Controller,
    Post,
    UploadedFiles,
    Body,
    Res,
    UseInterceptors,
  } from '@nestjs/common';
  import { FilesInterceptor } from '@nestjs/platform-express';
  import { DocumentService } from '../../services/document/document.service';
  import { DocumentDto } from '../../dtos/documents.dto';
  import { Response } from 'express';
  
  @Controller('document')
  export class DocumentController {
    constructor(private readonly documentService: DocumentService) {}
  
    @Post('generate')
    @UseInterceptors(FilesInterceptor('images', 10))
    async generateDocument(
      @UploadedFiles() files: Express.Multer.File[],
      @Body() DocumentDto: DocumentDto,
      @Res() res: Response,
    ) {
      const documentPath = await this.documentService.generateDocument(
        files,
        DocumentDto,
      );
      return res.download(documentPath);
    }
  }
  