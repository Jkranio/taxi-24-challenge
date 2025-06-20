
import { Driver } from 'src/modules/drivers/domain/models/driver.model';
import { Passenger } from '../models/passenger.model';

export const IPassengerRepository = 'IPassengerRepository';

export interface IPassengerRepository {
    create(passenger: Passenger): Promise<Passenger>;
    findAll(): Promise<Passenger[]>;
    findById(id: string): Promise<Passenger | null>;
    update(passenger: Passenger): Promise<Passenger>;
    delete(id: string): Promise<void>;
    findNearestDrivers(originLat: number, originLong: number, limit: number): Promise<Driver[]>;
}
