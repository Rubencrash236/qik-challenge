import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverController } from './Driver.controller';
import { DriverEntity } from './Driver.entity';
import { DriverService } from './Driver.service';


@Module({
  imports: [TypeOrmModule.forFeature([DriverEntity])],
  providers: [DriverService],
  controllers: [DriverController],
  exports: [DriverService],
})
export class DriverModule { }
