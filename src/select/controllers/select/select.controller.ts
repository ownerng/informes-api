import { Controller, Get } from '@nestjs/common';
import { SelectService } from '../../services/select/select.service';

@Controller('select')
export class SelectController {
  constructor(private readonly SelectService: SelectService) {}

  // Endpoint para obtener los lugares
  @Get('lugares')
  getLugares() {
    const lugares = this.SelectService.getLugares();
    return { lugares };
  }

  // Endpoint para obtener las entregas items
  @Get('entregas-items')
  getEntregasItems() {
    const entregasItems = this.SelectService.getEntregasItems();
    return { entregasItems };
  }
}
