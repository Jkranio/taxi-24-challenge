import { Repository } from 'typeorm';
import { PassengerEntity } from '../entities/passenger.entity';
import { Passenger } from '../../domain/models/passenger.model';
import { IPassengerRepository } from '../../domain/repositories/passenger.repository.interface';
import { TripEntity } from 'src/modules/trips/infrastructure/entities/trip.entity';
import { IDriverRepository } from 'src/modules/drivers/domain/repositories/driver.repository.interface';
import { Driver } from 'src/modules/drivers/domain/models/driver.model';
export declare class PassengerRepository implements IPassengerRepository {
    private readonly repo;
    private readonly tripRepo;
    private readonly driverRepository;
    constructor(repo: Repository<PassengerEntity>, tripRepo: Repository<TripEntity>, driverRepository: IDriverRepository);
    private toEntity;
    private toDomain;
    create(domain: Passenger): Promise<Passenger>;
    update(passenger: Passenger): Promise<Passenger>;
    findById(id: string): Promise<Passenger>;
    findAll(): Promise<Passenger[]>;
    delete(id: string): Promise<void>;
    findNearestDrivers(originLat: number, originLong: number, limit: number): Promise<Driver[]>;
}
