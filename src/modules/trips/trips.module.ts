import { Module } from '@nestjs/common';
import { TripsController } from './presentation/controllers/trips.controller';
import { TripsService } from './application/services/trips.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripEntity } from './infrastructure/entities/trip.entity';
import { ITripRepository } from './domain/repositories/trip.repository.interface';
import { TripRepository } from './infrastructure/repositories/trip.repository';
import { DriversModule } from '../drivers/drivers.module';
import { PassengersModule } from '../passengers/passengers.module';

@Module({

  imports: [TypeOrmModule.forFeature([TripEntity]), DriversModule, PassengersModule],
  controllers: [TripsController],
  providers: [
    TripsService,
    {
      provide: ITripRepository,
      useClass: TripRepository,
    },
  ],
  exports: [TripsService],
})
export class TripsModule { }
