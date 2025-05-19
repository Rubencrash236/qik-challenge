import { Body, Controller, Get, Param } from '@nestjs/common';
import { DriverService } from './Driver.service';
import { DriverEntity } from './Driver.entity';


@Controller('rest/Driver')
export class DriverController {

  constructor(private service: DriverService) { }
  /**
   * Todo: 
   * Obtener una lista de conductores
   * Obtenga una lista de conductores disponibles
   * Obtenga una lista de todos loc onductores disponibles en un radio de 3 km para un punto
   * Obtener un conductor especificio por id
   */

  @Get()
  getAll() {
    return this.service.getAll();
  }
  @Get('available')
  getAvailable() {
    return this.service.getAvailable();
  }
  @Get('available/nearby')
  getAvailableNearby(@Body() body: { latitude: number, longitude: number }) {
    return this.service.getAvailableNearby(body.latitude, body.longitude);
  }
  @Get(':id')
  getById(@Param('id') id: number) {
    return this.service.getById(id);
  }
}
