import { TripStatus } from '../../infrastructure/entities/trip.entity';
import { CreateInvoiceDto } from '../../../invoices/presentation/dto/create-invoice.dto';
export declare class CreateTripDto {
    driverId: string;
    passengerId: string;
    originLat: number;
    originLong: number;
    destLat: number;
    destLong: number;
    distanceKm?: number;
    durationSec?: number;
    fare: number;
    currency: string;
    status?: TripStatus;
    invoice?: CreateInvoiceDto;
}
