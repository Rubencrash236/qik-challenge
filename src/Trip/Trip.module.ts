import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripController } from './Trip.controller';
import { TripEntity } from './Entities/Trip.entity';
import { TripService } from './Services/Trip.service';
import { PassengerModule } from 'src/Passenger/Passenger.module';
import { BillService } from './Services/Bill.service';
import { BillEntity } from './Entities/Bill.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([TripEntity, BillEntity]),
    PassengerModule],
  providers: [TripService, BillService],
  controllers: [TripController]
})
export class TripModule { }
