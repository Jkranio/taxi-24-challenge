import { Repository } from 'typeorm';
import { ITripRepository } from '../../domain/repositories/trip.repository.interface';
import { TripEntity } from '../entities/trip.entity';
import { Trip } from '../../domain/models/trip.model';
export declare class TripRepository implements ITripRepository {
    private readonly repo;
    constructor(repo: Repository<TripEntity>);
    private toEntity;
    findAllActive(): Promise<Trip[]>;
    complete(id: string): Promise<Trip>;
    private toDomain;
    create(domain: Trip): Promise<Trip>;
    update(trip: Trip): Promise<Trip>;
    findById(id: string): Promise<Trip>;
    findAll(): Promise<Trip[]>;
    delete(id: string): Promise<void>;
}
