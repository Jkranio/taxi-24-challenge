import { Repository } from 'typeorm';
import { IDriverRepository } from '../../domain/repositories/driver.repository.interface';
import { DriverEntity } from '../entities/driver.entity';
import { Driver } from '../../domain/models/driver.model';
export declare class DriverRepository implements IDriverRepository {
    private readonly repo;
    constructor(repo: Repository<DriverEntity>);
    private toEntity;
    private toDomain;
    create(domain: Driver): Promise<Driver>;
    update(driver: Driver): Promise<Driver>;
    findAllAvailable(): Promise<Driver[]>;
    findById(id: string): Promise<Driver>;
    findAll(): Promise<Driver[]>;
    delete(id: string): Promise<void>;
    findNearby(lat: number, lng: number, radiusKm?: number): Promise<Driver[]>;
}
