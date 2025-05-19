import { Body, Controller, Get, Param } from '@nestjs/common';
import { PassengerService } from './Passenger.service';
import { PassengerEntity } from './Passenger.entity';


@Controller('rest/Passenger')
export class PassengerController {

  constructor(private service: PassengerService) { }

  /**
   * Todo:
   * Obtenga un alista de todos los pasajeros
   * Obtener un pasajero especifico por id
   * Para un pasajero solicitando un viaje, obtenga una lista de los 3 conductores mas cercanos
   */
  @Get()
  getAll() {
    return this.service.getAll();
  }
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.service.getById(id);
  }
  @Get('available/nearby')
  getNearby(@Body() body: { latitude: number, longitude: number }) {
    return this.service.getNearbyDrivers(body.latitude, body.longitude);
  }
}
