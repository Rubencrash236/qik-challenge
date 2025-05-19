import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PassengerModule } from './Passenger/Passenger.module';
import { DriverModule } from './Driver/Driver.module';
import { TripModule } from './Trip/Trip.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';

@Module({
  imports: [

    TripModule,
    DriverModule,
    PassengerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'challenge-qik-db',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'taxi_db', 
      entities: [],
      synchronize: false,
      logging: true,
      autoLoadEntities: true
    }),
  ],
  controllers: [AppController],
  providers: [SeederService,
AppService],
})
export class AppModule {}
