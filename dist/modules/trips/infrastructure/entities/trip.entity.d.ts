import { PassengerEntity } from "../../../passengers/infrastructure/entities/passenger.entity";
import { InvoiceEntity } from "../../../invoices/infrastructure/entities/invoice.entity";
import { DriverEntity } from "src/modules/drivers/infrastructure/entities/driver.entity";
export declare enum TripStatus {
    REQUESTED = "REQUESTED",
    ONGOING = "ONGOING",
    FINISHED = "FINISHED",
    CANCELLED = "CANCELLED",
    NO_SHOW = "NO_SHOW"
}
export declare class TripEntity {
    id: string;
    driver: DriverEntity;
    passenger: PassengerEntity;
    invoice: InvoiceEntity;
    originLat: number;
    originLong: number;
    destLat: number;
    destLong: number;
    distanceKm: number;
    durationSec: number;
    fare: number;
    currency: string;
    status: TripStatus;
    requestedAt: Date;
    startedAt?: Date;
    finishedAt?: Date;
    updatedAt: Date;
}
