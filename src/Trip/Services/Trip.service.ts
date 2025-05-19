import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TripEntity } from '../Entities/Trip.entity';
import { In, Repository } from 'typeorm';
import { PassengerService } from 'src/Passenger/Passenger.service';
import { BillService } from './Bill.service';
import { BillEntity } from '../Entities/Bill.entity';

@Injectable()
export class TripService {

    constructor(
        @InjectRepository(TripEntity)
        private readonly tripRepository: Repository<TripEntity>,
        private readonly passengerService: PassengerService,
        private readonly billService: BillService,
    ) { }

    async getAll(): Promise<TripEntity[]> {
        return this.tripRepository.find(
            { relations: ['passenger', 'driver', 'bill'] }
        );
    }
    async getActive(): Promise<TripEntity[]> {
        return this.tripRepository.find({
            where: { status: 'active' },
            relations: ['passenger', 'driver', 'bill']
        });
    }
    async getById(id: number): Promise<TripEntity | null> {
        return this.tripRepository.findOne({
            where: { id },
            relations: ['passenger', 'driver', 'bill']
        });
    }
    async create(passengerId: number, destinationLatitude: number,
        destinationLongitude: number): Promise<TripEntity> {
        const passenger = await this.passengerService.getById(passengerId);
        if (!passenger) {
            throw new Error('Passenger not found');
        }
        const drivers = await this.passengerService.getNearbyDrivers(passenger.latitude, passenger.longitude);
        if (drivers.length === 0) {
            throw new Error('No available drivers nearby');
        }
        const trip = this.tripRepository.create({
            status: 'active',
            originLatitude: passenger.latitude,
            originLongitude: passenger.longitude,
            destinationLatitude,
            destinationLongitude,
            passenger: { id: passengerId },
            driver: { id: drivers[0].id },
        });
        return this.tripRepository.save(trip);
    }
    async complete(id: number): Promise<TripEntity> {
        const trip = await this.getById(id);
        if (trip) {
            trip.status = 'completed';
            const bill = await this.billService.createBill(trip);
            trip.bill = bill;
            const trip2 = await this.tripRepository.save(trip);
            return this.stripCircularReferences(trip2);
        }
        throw new Error('Trip not found');
    }

    private stripCircularReferences(trip: TripEntity): any {
        if (trip && trip.bill) {
            // Remove the trip property from bill to avoid circular reference
            const bill = { ...trip.bill };
            bill.trip = new TripEntity();
            return { ...trip, bill };
        }
        return trip;
    }

}
