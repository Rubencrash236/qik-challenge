import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BillEntity } from '../Entities/Bill.entity';
import { Repository } from 'typeorm';
import { TripEntity } from '../Entities/Trip.entity';

@Injectable()
export class BillService {

    constructor(
        @InjectRepository(BillEntity)
        private readonly billRepository: Repository<BillEntity>,
    ) { }

    async getAll(): Promise<BillEntity[]> {
        return this.billRepository.find();
    }
    async getById(id: number): Promise<BillEntity | null> {
        return this.billRepository.findOne({ where: { id } });
    }
    async createBill(trip: TripEntity): Promise<BillEntity> {
        const bill = this.billRepository.save({
            trip,
            price: this.calculateBillAmount(
                trip.originLatitude,
                trip.originLongitude,
                trip.destinationLatitude,
                trip.destinationLongitude
            ),
            distance: this.calculateDistanceKm(
                trip.originLatitude,
                trip.originLongitude,
                trip.destinationLatitude,
                trip.destinationLongitude
            ),
        });
        return bill;
    }
    private calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const toRad = (value: number) => (value * Math.PI) / 180;
        const R = 6371; // Earth radius in kilometers
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) *
            Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    calculateBillAmount(originLat: number, originLon: number,
        destLat: number, destLon: number): number {

        const baseFare = 100; // base fare in DOP
        const perKmRate = 25; // rate per kilometer
        const distance = this.calculateDistanceKm(originLat, originLon, destLat, destLon);
        return Math.round(baseFare + perKmRate * distance);
    }

}
