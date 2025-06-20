import { Driver } from "../models/driver.model";

export const IDriverRepository = 'IDriverRepository';

export interface IDriverRepository {
    findAll(): Promise<Driver[]>;
    findById(id: string): Promise<Driver | null>;
    findAllAvailable(): Promise<Driver[]>;
    findNearby(lat: number, lng: number, radius: number): Promise<Driver[]>;
    create(driver: Driver): Promise<Driver>;
    update(driver: Driver): Promise<Driver>;
    delete(id: string): Promise<void>;
}
