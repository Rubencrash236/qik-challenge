import { TripController } from 'src/Trip/Trip.controller';
import { TripEntity } from 'src/Trip/Entities/Trip.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Bill')
export class BillEntity {
    @PrimaryGeneratedColumn() 
    id:number;
    
    @OneToOne(() => TripEntity, trip => trip.bill)
    trip: TripEntity;

    @Column({ type: 'double precision' })
    price:number;
    @Column({ type: 'double precision' })
    distance:number;
}
