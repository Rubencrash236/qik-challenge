import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassengerController } from './Passenger.controller';
import { PassengerEntity } from './Passenger.entity';
import { PassengerService } from './Passenger.service';
import { DriverModule } from 'src/Driver/Driver.module';

@Module({
  imports: [TypeOrmModule.forFeature([PassengerEntity]),
    DriverModule],
  providers: [PassengerService],
  controllers: [PassengerController],
  exports: [PassengerService],
})
export class PassengerModule { }
