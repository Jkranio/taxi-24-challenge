import { Trip } from "../models/trip.model";

export const ITripRepository = 'ITripRepository';

export interface ITripRepository {
    create(trip: Trip): Promise<Trip>;
    findAll(): Promise<Trip[]>;
    findById(id: string): Promise<Trip | null>;
    update(trip: Trip): Promise<Trip>;
    delete(id: string): Promise<void>;
    findAllActive(): Promise<Trip[]>;
    complete(tripId: string): Promise<Trip>;
}
