import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PassengerEntity } from './Passenger.entity';
import { Repository } from 'typeorm';
import { DriverService } from 'src/Driver/Driver.service';
import { DriverEntity } from 'src/Driver/Driver.entity';

@Injectable()
export class PassengerService{

    constructor(
        @InjectRepository(PassengerEntity)
        private readonly passengerRepository: Repository<PassengerEntity>,
        private readonly driverService: DriverService,
    ) { }

    async getAll(): Promise<PassengerEntity[]> {
        return this.passengerRepository.find();
    }
    async getById(id: number): Promise<PassengerEntity | null> {
        return this.passengerRepository.findOne({ where: { id } });
    }
    async getNearbyDrivers(latitude: number, longitude: number): Promise<DriverEntity[]> {
        return this.driverService.getAvailableClosest(latitude, longitude);
    }

}
