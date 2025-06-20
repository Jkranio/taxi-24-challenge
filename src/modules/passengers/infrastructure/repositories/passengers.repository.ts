import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PassengerEntity } from '../entities/passenger.entity';
import { Passenger } from '../../domain/models/passenger.model';
import {
    IPassengerRepository,
} from '../../domain/repositories/passenger.repository.interface';
import { TripEntity } from 'src/modules/trips/infrastructure/entities/trip.entity';
import { Trip, TripStatus } from 'src/modules/trips/domain/models/trip.model';
import { IDriverRepository } from 'src/modules/drivers/domain/repositories/driver.repository.interface';
import { Driver } from 'src/modules/drivers/domain/models/driver.model';
@Injectable()
export class PassengerRepository implements IPassengerRepository {
    constructor(
        @InjectRepository(PassengerEntity)
        private readonly repo: Repository<PassengerEntity>,
        @InjectRepository(TripEntity)
        private readonly tripRepo: Repository<TripEntity>,
        @Inject(IDriverRepository)
        private readonly driverRepository: IDriverRepository
        
    ) { }

    private toEntity(domain: Passenger): PassengerEntity {
        return this.repo.create({
            id: domain.id,
            fullName: domain.fullName,
            phone: domain.phone,
            email: domain.email,
            deletedAt: domain.deletedAt,
            trips: domain.trips?.map(t =>
                this.tripRepo.create({ id: t.getId?.() ?? t.getId() }),
            ),
        });
    }

    private toDomain(e: PassengerEntity): Passenger {
        return new Passenger({
            id: e.id,
            fullName: e.fullName,
            phone: e.phone,
            email: e.email,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt,
            deletedAt: e.deletedAt,
            trips:
                e.trips?.map(t =>
                    new Trip({
                        id: t.id,
                        driverId: t.driver?.id,
                        passengerId: t.passenger?.id,
                        originLat: t.originLat,
                        originLong: t.originLong,
                        destLat: t.destLat,
                        destLong: t.destLong,
                        distanceKm: t.distanceKm,
                        durationSec: t.durationSec,
                        status: t.status as TripStatus | undefined,
                        requestedAt: t.requestedAt,
                        startedAt: t.startedAt,
                        finishedAt: t.finishedAt,
                        updatedAt: t.updatedAt,
                    }),
                ) ?? [],
        });
    }

    async create(domain: Passenger): Promise<Passenger> {
        const saved = await this.repo.save(this.toEntity(domain));
        return this.toDomain(saved);
    }

    async update(passenger: Passenger): Promise<Passenger> {
        const existing = await this.repo.findOne({ 
            where: { id: passenger.getId() },
            relations: { trips: true }
        });
    
        if (!existing) {
            throw new NotFoundException('Passenger not found');
        }
    
        const entityToUpdate = this.toEntity(passenger);
        
        const saved = await this.repo.save({
            ...existing,
            ...entityToUpdate,
            updatedAt: new Date()
        });
    
        return this.toDomain(saved);
    }

    async findById(id: string): Promise<Passenger> {
        const entity = await this.repo.findOne({
            where: { id },
            relations: { trips: true }, // eager load trips
        });
        if (!entity) throw new NotFoundException('Passenger not found');
        return this.toDomain(entity);
    }

    async findAll(): Promise<Passenger[]> {
        const list = await this.repo.find({ relations: { trips: true } });
        return list.map((e) => this.toDomain(e));
    }

    async delete(id: string): Promise<void> {
        await this.repo.softDelete({ id });
    }
    async findNearestDrivers(originLat: number, originLong: number, limit: number): Promise<Driver[]> {

        const nearbyDrivers = await this.driverRepository.findNearby(originLat, originLong, limit);
        return nearbyDrivers;
    }
}

