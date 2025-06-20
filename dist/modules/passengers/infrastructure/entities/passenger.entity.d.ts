import { TripEntity } from '../../../trips/infrastructure/entities/trip.entity';
export declare class PassengerEntity {
    id: string;
    fullName: string;
    phone: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    trips: TripEntity[];
}
