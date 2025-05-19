import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Passenger')
export class PassengerEntity {
    @PrimaryGeneratedColumn() 
    id:number;
    @Column()
    name:string;
    @Column()
    birthdate:string;
    @Column()
    idcard:string;
    @Column()
    phone:string;
    @Column()
    email:string;
    @Column()
    address:string;
    @Column({ type: 'double precision' })
    longitude: number;
    @Column({ type: 'double precision' })
    latitude: number;
}
