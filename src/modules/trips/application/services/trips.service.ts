import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ITripRepository } from '../../domain/repositories/trip.repository.interface';
import { CreateTripDto } from '../../presentation/dto/create-trip.dto';
import { Trip } from '../../domain/models/trip.model';
import { UpdateTripDto } from '../../presentation/dto/update-trip.dto';
import { DriversService } from 'src/modules/drivers/application/services/drivers.service';
import { PassengersService } from 'src/modules/passengers/application/services/passengers.service';

@Injectable()
export class TripsService {
    constructor(
        @Inject(ITripRepository)
        private readonly repo: ITripRepository,
        private readonly driverService: DriversService,
        private readonly passengerService: PassengersService
    ) { }

    async create(dto: CreateTripDto): Promise<Trip> {

        const driver = await this.driverService.findOne(dto.driverId);
        const passenger = await this.passengerService.findOne(dto.passengerId);
        if (!driver) {
            throw new NotFoundException('Driver not found');
        }
        const trip = new Trip({
            driverId: dto.driverId,
            passengerId: dto.passengerId,
            status: dto.status,
            originLat: dto.originLat,
            originLong: dto.originLong,
            destLat: dto.destLat,
            destLong: dto.destLong,
            fare: dto.fare,
            currency: dto.currency,
            requestedAt: new Date(),
            startedAt: undefined, 
            finishedAt: undefined,
            updatedAt: new Date(),
            driver: driver,
            passenger: passenger,
        });
        return this.repo.create(trip);
    }

    async findAll(): Promise<Trip[]> {
        return this.repo.findAll();
    }

    async findAllActive(): Promise<Trip[]> {
        return this.repo.findAllActive();
    }
    async complete(id: string): Promise<Trip> {
        return this.repo.complete(id);
    }
    async findOne(id: string): Promise<Trip> {
        const p = await this.repo.findById(id);
        if (!p) throw new NotFoundException(`Trip ${id} no encontrado`);
        return p;
    }

    async update(id: string, dto: UpdateTripDto): Promise<Trip> {
        const existing = await this.findOne(id);
        return this.repo.update(existing);
    }

    async remove(id: string): Promise<void> {
        await this.findOne(id);
        await this.repo.delete(id);
    }
}
