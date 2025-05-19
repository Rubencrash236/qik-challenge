import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DriverEntity } from './Driver.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DriverService{

    constructor(
        @InjectRepository(DriverEntity)
        private readonly driverRepository: Repository<DriverEntity>,
    ) { }

    async getAll(): Promise<DriverEntity[]> {
        return this.driverRepository.find();
    }
    async getAvailable(): Promise<DriverEntity[]> {
        return this.driverRepository.find({ where: { available: true } });
    }
    //This is using the Haversine formula to calculate the distance between two points on the Earth
    async getAvailableNearby(latitude: number, longitude: number): Promise<DriverEntity[]> {
        return this.driverRepository.createQueryBuilder('driver')
            .where('driver.available = :available', { available: true })
            .andWhere(
                `(
                    6371000 * acos(
                    cos(radians(:latitude)) * cos(radians(driver.latitude)) *
                    cos(radians(driver.longitude) - radians(:longitude)) +
                    sin(radians(:latitude)) * sin(radians(driver.latitude))
                )) < :radius`, {
                latitude,
                longitude,
                radius: 3000 // 3 km
            })
            .getMany();
    }

    async getAvailableClosest(latitude: number, longitude: number): Promise<DriverEntity[]> {
        return this.driverRepository.createQueryBuilder('driver')
        .where('driver.available = :available', { available: true })
        .addSelect(`(
            6371000 * acos(
                cos(radians(:latitude)) * cos(radians(driver.latitude)) *
                cos(radians(driver.longitude) - radians(:longitude)) +
                sin(radians(:latitude)) * sin(radians(driver.latitude))
            )
        )`, 'distance')
        .andWhere(`(
            6371000 * acos(
                cos(radians(:latitude)) * cos(radians(driver.latitude)) *
                cos(radians(driver.longitude) - radians(:longitude)) +
                sin(radians(:latitude)) * sin(radians(driver.latitude))
            )
        ) < :radius`, {
            latitude,
            longitude,
            radius: 3000 // 3 km
        })
        .orderBy('distance', 'ASC')
        .limit(3)
        .getMany();
    }
    async getById(id: number): Promise<DriverEntity | null> {
        return this.driverRepository.findOne({ where: { id } });
    }
}
