import { Trip } from 'src/modules/trips/domain/models/trip.model';
export declare class Passenger {
    readonly id: string;
    fullName: string;
    phone: string;
    email?: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    trips: Trip[];
    constructor(props: {
        id?: string;
        fullName: string;
        phone: string;
        email?: string;
        createdAt?: Date;
        updatedAt?: Date;
        deletedAt?: Date;
        trips?: Trip[];
    });
    getId(): string;
    updateDetails(fullName: string, phone: string, email?: string): void;
    markDeleted(): void;
}
