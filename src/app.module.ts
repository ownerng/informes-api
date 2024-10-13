import { Module } from '@nestjs/common';
import { DocumentModule } from './document/document.module';
import { SelectModule } from './select/select.module';

@Module({
  imports: [ DocumentModule, SelectModule ],
  controllers: [  ],
})
export class AppModule {}
