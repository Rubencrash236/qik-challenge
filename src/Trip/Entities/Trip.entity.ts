import { BillEntity } from 'src/Trip/Entities/Bill.entity';
import { DriverEntity } from 'src/Driver/Driver.entity';
import { PassengerEntity } from 'src/Passenger/Passenger.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Trip')
export class TripEntity {
    @PrimaryGeneratedColumn() 
    id:number;
    @Column()
    status:string;
    @Column({ type: 'double precision', name: 'originLatitude' })
    originLongitude: number;
    @Column({ type: 'double precision', name: 'originLongitude' })
    originLatitude: number;
    @Column({ type: 'double precision', name: 'destinationLatitude' })
    destinationLongitude: number;
    @Column({ type: 'double precision', name: 'destinationLongitude' })
    destinationLatitude: number;

    @ManyToOne(() => PassengerEntity)
    @JoinColumn({ name: 'passengerId' })
    passenger: PassengerEntity;

    @ManyToOne(() => DriverEntity)
    @JoinColumn({ name: 'driverId' })
    driver: DriverEntity;

    @OneToOne(() => BillEntity)
    @JoinColumn({ name: 'billId', referencedColumnName: 'id' })
    bill: BillEntity;


}
