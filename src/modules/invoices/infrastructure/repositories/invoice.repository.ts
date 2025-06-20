import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IInvoiceRepository } from '../../domain/repositories/invoice.repository.interface';
import { PaymentMethod as PaymentMethodEnum, InvoiceEntity } from '../entities/invoice.entity';
import { Invoice } from '../../domain/models/invoice.model';
import { Trip } from '../../../trips/domain/models/trip.model';
import { TripEntity } from 'src/modules/trips/infrastructure/entities/trip.entity';

@Injectable()
export class InvoiceRepository implements IInvoiceRepository {
    constructor(
        @InjectRepository(InvoiceEntity)
        private readonly repo: Repository<InvoiceEntity>,
        @InjectRepository(TripEntity)
        private readonly tripRepo: Repository<TripEntity>
    ) { }

    private toEntity(domain: Invoice): InvoiceEntity {
        const entity = new InvoiceEntity();
        entity.id = domain.getId();
        entity.tripId = domain.getTripId() ?? '';
        entity.subtotal = domain.getSubtotal();
        entity.tax = domain.getTax();
        entity.total = domain.getTotal();
        entity.paymentMethod = domain.getPaymentMethod() as PaymentMethodEnum;
        entity.issuedAt = domain.getIssuedAt();
        
        return entity;
    }
    private toDomain(e: InvoiceEntity): Invoice {
        return new Invoice({
            id: e.id,
            tripId: e.tripId,
            subtotal: e.subtotal,
            tax: e.tax,
            total: e.total,
            paymentMethod: e.paymentMethod,
            issuedAt: e.issuedAt,
            trip: e.trip
                ? new Trip({
                    id: e.trip.id,
                    driverId: e.trip.driver?.id,
                    passengerId: e.trip.passenger?.id,
                    fare: e.trip.fare,
                    currency: e.trip.currency,
                    status: e.trip.status,
                    originLat: e.trip.originLat,
                    originLong: e.trip.originLong,
                    destLat: e.trip.destLat,
                    destLong: e.trip.destLong,
                    requestedAt: e.trip.requestedAt,
                })
                : new Trip({
                    id: '',
                    driverId: undefined,
                    passengerId: '',
                    fare: 0,
                    currency: '',
                    status: undefined,
                    originLat: 0,
                    originLong: 0,
                    destLat: 0,
                    destLong: 0,
                    requestedAt: new Date(0),
                }),
        });
    }


    async create(invoice: Invoice): Promise<Invoice> {
        const trip = await this.tripRepo.findOne({ 
            where: { id: invoice.getTripId() } 
        });
        
        if (!trip) {
            throw new NotFoundException('Trip not found');
        }
    
        const entity = this.toEntity(invoice);
        const saved = await this.repo.save(entity);
        
        return this.toDomain(saved);
    }

    async update(invoice: Invoice): Promise<Invoice> {
        const existing = await this.repo.findOne({ 
            where: { id: invoice.getId() },
            relations: { trip: { driver: true, passenger: true } }
        });
    
        if (!existing) {
            throw new NotFoundException('Invoice not found');
        }
    
        const entityToUpdate = this.toEntity(invoice);
        
        const saved = await this.repo.save({
            ...existing,
            ...entityToUpdate,
            updatedAt: new Date()
        });
    
        return this.toDomain(saved);
    }

    async findById(id: string): Promise<Invoice> {
        const e = await this.repo.findOne({
            where: { id },
            relations: { trip: { driver: true, passenger: true } },
        });
        if (!e) throw new NotFoundException('Invoice not found');
        return this.toDomain(e);
    }

    async findAll(): Promise<Invoice[]> {
        const list = await this.repo.find({ relations: { trip: true } });
        return list.map((e) => this.toDomain(e));
    }

    async delete(id: string): Promise<void> {
        await this.repo.softDelete({ id });
    }
}