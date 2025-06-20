import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { DeepPartial, IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IDriverRepository } from '../../domain/repositories/driver.repository.interface';
import { DriverEntity, DriverStatus } from '../entities/driver.entity';
import { Driver } from '../../domain/models/driver.model';
import { Trip } from 'src/modules/trips/domain/models/trip.model';
import { TripEntity } from 'src/modules/trips/infrastructure/entities/trip.entity';


@Injectable()
export class DriverRepository implements IDriverRepository {
    constructor(
        @InjectRepository(DriverEntity)
        private readonly repo: Repository<DriverEntity>,
    ) { }


    private toEntity(domain: Driver): DriverEntity {
        console.log('Converting domain to entity:', domain);
        return this.repo.create({
            id: domain.id,
            fullName: domain.fullName,
            phone: domain.phone,
            email: domain.email,
            vehiclePlate: domain.vehiclePlate,
            vehicleModel: domain.vehicleModel,
            driverLicense: domain.driverLicense,
            status: (domain.status ?? DriverStatus.OFFLINE) as DriverStatus,
            latitude: domain.latitude,
            longitude: domain.longitude,
            rating: domain.rating,
            deletedAt: domain.deletedAt,
            trips: domain.trips?.map((t) => ({ id: t.getId() } as TripEntity)),
        });
    }

    private toDomain(e: DriverEntity): Driver {
        return new Driver({
            id: e.id,
            fullName: e.fullName,
            phone: e.phone,
            email: e.email,
            vehiclePlate: e.vehiclePlate,
            vehicleModel: e.vehicleModel,
            driverLicense: e.driverLicense,
            status: e.status,
            latitude: e.latitude,
            longitude: e.longitude,
            rating: e.rating,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt,
            deletedAt: e.deletedAt,
            trips: e.trips?.map((t) => new Trip({
                id: t.id,
                passengerId: t.passenger?.id || '',  
                originLat: t.originLat || 0,        
                originLong: t.originLong || 0,   
                destLat: t.destLat || 0,           
                destLong: t.destLong || 0,    
                status: t.status,
                driverId: t.driver?.id,
                fare: t.fare,
                currency: t.currency,
                requestedAt: t.requestedAt || new Date()
            })) ?? [],
        });
    }

    async create(domain: Driver): Promise<Driver> {
        console.log('Creating driver:', domain);
        const saved = await this.repo.save(this.toEntity(domain));
        return this.toDomain(saved);
    }

    async update(driver: Driver): Promise<Driver> {
        const existing = await this.repo.findOne({ 
            where: { id: driver.getId() },
            relations: { trips: true }
        });
    
        if (!existing) {
            throw new NotFoundException('Driver not found');
        }
    
        const entityToUpdate = this.toEntity(driver);
        
        const saved = await this.repo.save({
            ...existing,
            ...entityToUpdate,
            updatedAt: new Date()
        });
    
        return this.toDomain(saved);
    }
    async findAllAvailable(): Promise<Driver[]> {
        const list = await this.repo.find({
            where: { 
                status: DriverStatus.AVAILABLE,
                deletedAt: IsNull(),
                
            },
            relations: { trips: true }
        });
        return list.map(e => this.toDomain(e));
    }
    async findById(id: string): Promise<Driver> {
        const e = await this.repo.findOne({
            where: { id },
            relations: { trips: true },
        });
        if (!e) throw new NotFoundException('Driver not found');
        return this.toDomain(e);
    }

    async findAll(): Promise<Driver[]> {
        const list = await this.repo.find({ relations: { trips: true } });
        return list.map((e) => this.toDomain(e));
    }

    async delete(id: string): Promise<void> {
        await this.repo.softDelete({ id });
    }

    async findNearby(lat: number, lng: number, radiusKm: number = 3): Promise<Driver[]> {
        const drivers = await this.repo
            .createQueryBuilder('driver')
            .where('driver.status = :status', { status: 'AVAILABLE' })
            .andWhere('driver.deletedAt IS NULL')

            .andWhere(`
                (6371 * acos(
                    cos(radians(:lat)) * 
                    cos(radians(driver.latitude)) * 
                    cos(radians(driver.longitude) - radians(:lng)) + 
                    sin(radians(:lat)) * 
                    sin(radians(driver.latitude))
                )) <= :radius
            `)
            .setParameters({
                lat,
                lng,
                radius: radiusKm
            })
            .getMany();
    
        return drivers.map(driver => this.toDomain(driver));
    }
}
