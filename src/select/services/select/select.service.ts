import { Injectable } from '@nestjs/common';
import * as data from '../../../common/data.json';

@Injectable()
export class SelectService {
  
  // Obtener la lista de lugares
  getLugares(): string[] {
    return data.lugares;
  }

  // Obtener la lista de entregas items
  getEntregasItems(): string[] {
    return data.entregasItems;
  }
}
