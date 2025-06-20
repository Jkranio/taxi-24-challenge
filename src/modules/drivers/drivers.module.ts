import { Module } from '@nestjs/common';
import { DriversController } from './presentation/controllers/drivers.controller';
import { DriversService } from './application/services/drivers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverEntity } from './infrastructure/entities/driver.entity';
import { IDriverRepository } from './domain/repositories/driver.repository.interface';
import { DriverRepository } from './infrastructure/repositories/driver.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DriverEntity])],
  controllers: [DriversController],
  providers: [DriversService,{
    provide: IDriverRepository,
    useClass: DriverRepository
  },
], exports: [DriversService, IDriverRepository]
})
export class DriversModule {}
