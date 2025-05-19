import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { TripService } from './Services/Trip.service';
import { TripEntity } from './Entities/Trip.entity';


@Controller('rest/Trip')
export class TripController {

  constructor(private service: TripService) { }
  /**
   * Todo:
   * Crear una nueva solicitud de "viaje" asignando a un piloto
   * Completar un viaje
   * Obtenga una lista de todos los viajes activos
   */
  @Get()
  getAll() {
    return this.service.getAll();
  }
  @Get('active')
  getActive() {
    return this.service.getActive();
  }
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.service.getById(id);
  }
  @Post('create')
  create(@Body() body: { passengerId: number,  destinationLatitude: number, destinationLongitude: number }) {

    return this.service.create(body.passengerId, body.destinationLatitude, body.destinationLongitude);
  }
  @Post('complete')
  complete(@Body() body: { id: number }) {
    return this.service.complete(body.id);
  }

}
