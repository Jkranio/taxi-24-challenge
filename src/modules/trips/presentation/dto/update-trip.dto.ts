import { IsOptional, IsNumber, IsEnum } from 'class-validator';
import { TripStatus } from '../../domain/models/trip.model';

export class UpdateTripDto {
    @IsOptional()
    @IsNumber()
    fare?: number;

    @IsOptional()
    status?: TripStatus;
}