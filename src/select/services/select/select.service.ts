import { Injectable } from '@nestjs/common';

@Injectable()
export class SelectService {
  
  // Obtener la lista de lugares
  getLugares(): string[] {
    return [
      'Uribe',
      'Puerto Lleras',
      'La Macarena',
      'Puerto Concordia',
      'Restrepo',
      'Mesetas',
      'San Juan de Arama',
      'Cumaral',
      'Vista Hermosa',
      'Mapiripán',
      'PIC Departamental',
      'Barranca de Upía',
    ];
  }

  // Obtener la lista de entregas items
  getEntregasItems(): string[] {
    return [
      'Perifoneo',
      'Almuerzos',
      'Refrigerios',
      'Sillas',
      'Mesas',
      'Carpa',
    ];
  }
}
