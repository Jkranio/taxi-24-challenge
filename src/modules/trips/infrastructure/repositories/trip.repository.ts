import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository, In, IsNull } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ITripRepository } from '../../domain/repositories/trip.repository.interface';
import { TripEntity, TripStatus } from '../entities/trip.entity';
import { Trip } from '../../domain/models/trip.model';
import { DriverEntity } from 'src/modules/drivers/infrastructure/entities/driver.entity';
import { PassengerEntity } from 'src/modules/passengers/infrastructure/entities/passenger.entity';
import { InvoiceEntity } from 'src/modules/invoices/infrastructure/entities/invoice.entity';

@Injectable()
export class TripRepository implements ITripRepository {
    constructor(
        @InjectRepository(TripEntity)
        private readonly repo: Repository<TripEntity>,
    ) { }

    private toEntity(domain: Trip): TripEntity {
        return this.repo.create({
            id: domain.getId(),
            driver: domain.getDriverId()
                ? ({ id: domain.getDriverId() } as DriverEntity)
                : undefined,
            passenger: domain.getPassengerId()
                ? ({ id: domain.getPassengerId() } as PassengerEntity)
                : undefined,
            originLat: domain.getOriginLat(),
            originLong: domain.getOriginLong(),
            destLat: domain.getDestLat(),
            destLong: domain.getDestLong(),
            distanceKm: domain.getDistanceKm(),
            durationSec: domain.getDurationSec(),
            fare: domain.getFare(),
            currency: domain.getCurrency(),
            status: domain.getStatus() as TripStatus,
            requestedAt: domain.getRequestedAt(),
            startedAt: domain.getStartedAt(),
            finishedAt: domain.getFinishedAt(),
            updatedAt: domain.getUpdatedAt(),
            invoice: domain.getInvoiceId()
                ? ({ id: domain.getInvoiceId() } as InvoiceEntity)
                : undefined,
        });
    }
    async findAllActive(): Promise<Trip[]> {
        const list = await this.repo.find({
            where: {
                status: In([TripStatus.REQUESTED, TripStatus.ONGOING])
            },
            relations: { 
                driver: true, 
                passenger: true, 
                invoice: true 
            },
        });
        return list.map((e) => this.toDomain(e));
    }

    async complete(id: string): Promise<Trip> {
        const trip = await this.findById(id);
        
        trip.complete();
        
        return this.update(trip);
    }

    private toDomain(e: TripEntity): Trip {
        return new Trip({
            id: e.id,
            driverId: e.driver?.id,
            passengerId: e.passenger?.id,
            originLat: e.originLat,
            originLong: e.originLong,
            destLat: e.destLat,
            destLong: e.destLong,
            distanceKm: e.distanceKm,
            durationSec: e.durationSec,
            fare: e.fare,
            currency: e.currency,
            status: e.status as TripStatus | undefined,
            requestedAt: e.requestedAt,
            startedAt: e.startedAt,
            finishedAt: e.finishedAt,
            updatedAt: e.updatedAt,
            driver: e.driver ? {
                id: e.driver.id,
                fullName: e.driver.fullName,
                phone: e.driver.phone,
                email: e.driver.email,
                vehiclePlate: e.driver.vehiclePlate,
                vehicleModel: e.driver.vehicleModel,
                status: e.driver.status,
                latitude: e.driver.latitude,
                longitude: e.driver.longitude,
                rating: e.driver.rating
            } : undefined,
            passenger: e.passenger ? {
                id: e.passenger.id,
                fullName: e.passenger.fullName,
                phone: e.passenger.phone,
                email: e.passenger.email
            } : undefined,
        });
    }

    async create(domain: Trip): Promise<Trip> {
        const saved = await this.repo.save(this.toEntity(domain));
        return this.toDomain(saved);
    }


    async update(trip: Trip): Promise<Trip> {
        const existing = await this.repo.findOne({ 
            where: { id: trip.getId() },
            relations: { driver: true, passenger: true, invoice: true }
        });
    
        if (!existing) {
            throw new NotFoundException('Trip not found');
        }
    
        const entityToUpdate = this.toEntity(trip);
        
        const saved = await this.repo.save({
            ...existing,
            ...entityToUpdate,
            updatedAt: new Date()
        });
    
        return this.toDomain(saved);
    }

    async findById(id: string): Promise<Trip> {
        const entity = await this.repo.findOne({
            where: { id },
            relations: { driver: true, passenger: true, invoice: true },
        });
        if (!entity) throw new NotFoundException('Trip not found');
        return this.toDomain(entity);
    }

    async findAll(): Promise<Trip[]> {
        const list = await this.repo.find({
            relations: { driver: true, passenger: true, invoice: true },
        });
        return list.map((e) => this.toDomain(e));
    }

    async delete(id: string): Promise<void> {
        await this.repo.softDelete({ id });
    }

    
}





