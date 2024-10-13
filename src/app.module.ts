import { Module } from '@nestjs/common';
import { DocumentController } from './document/controllers/document/document.controller';
import { DocumentModule } from './document/document.module';

@Module({
  imports: [ DocumentModule ],
  controllers: [ DocumentController ],
})
export class AppModule {}
