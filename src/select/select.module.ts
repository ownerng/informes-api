import { Module } from '@nestjs/common';
import { SelectController } from './controllers/select/select.controller';
import { SelectService } from './services/select/select.service';

@Module({
  controllers: [SelectController],
  providers: [SelectService]
})
export class SelectModule {}
