import { Module } from '@nestjs/common';
import { DocumentController } from './document/controllers/document/document.controller';
import { DocumentModule } from './document/document.module';
import { SelectModule } from './select/select.module';

@Module({
  imports: [ DocumentModule, SelectModule ],
  controllers: [ DocumentController ],
})
export class AppModule {}
