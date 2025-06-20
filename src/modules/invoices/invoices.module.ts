import { Module } from '@nestjs/common';
import { InvoicesController } from './presentation/controllers/invoices.controller';
import { InvoicesService } from './application/services/invoices.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceEntity } from './infrastructure/entities/invoice.entity';
import { IInvoiceRepository } from './domain/repositories/invoice.repository.interface';
import { InvoiceRepository } from './infrastructure/repositories/invoice.repository';
import { TripsModule } from '../trips/trips.module';
import { TripEntity } from '../trips/infrastructure/entities/trip.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceEntity, TripEntity]), TripsModule],
  controllers: [InvoicesController],
  providers: [
    InvoicesService,
    {
      provide: IInvoiceRepository,
      useClass: InvoiceRepository,
    },
  ],
  exports: [InvoicesService],
})
export class InvoicesModule {}
