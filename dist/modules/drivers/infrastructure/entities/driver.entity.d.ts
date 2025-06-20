import { TripEntity } from '../../../trips/infrastructure/entities/trip.entity';
export declare enum DriverStatus {
    AVAILABLE = "AVAILABLE",
    ON_TRIP = "ON_TRIP",
    OFFLINE = "OFFLINE"
}
export declare class DriverEntity {
    id: string;
    fullName: string;
    phone: string;
    email?: string;
    vehiclePlate: string;
    vehicleModel: string;
    driverLicense: string;
    status: DriverStatus;
    latitude?: number;
    longitude?: number;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    trips: TripEntity[];
}
