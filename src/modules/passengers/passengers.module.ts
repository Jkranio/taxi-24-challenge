import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassengerEntity } from 'src/modules/passengers/infrastructure/entities/passenger.entity';
import { PassengersController } from './presentation/controllers/passengers.controller';
import { PassengersService } from './application/services/passengers.service';
import { IPassengerRepository } from './domain/repositories/passenger.repository.interface';
import { PassengerRepository } from './infrastructure/repositories/passengers.repository';
import { TripEntity } from '../trips/infrastructure/entities/trip.entity';
import { DriversModule } from '../drivers/drivers.module';



@Module({
  imports: [
    TypeOrmModule.forFeature([PassengerEntity, TripEntity]),
    DriversModule
  ],
  providers: [
    PassengersService,
    {
      provide: IPassengerRepository,
      useClass: PassengerRepository
    }
  ],
  controllers: [PassengersController],
  exports: [PassengersService]
})
export class PassengersModule {}
