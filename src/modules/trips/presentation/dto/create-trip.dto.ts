
import {
  IsUUID,
  IsNumber,
  IsEnum,
  IsOptional,
  IsLatitude,
  IsLongitude,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TripStatus } from '../../infrastructure/entities/trip.entity';
import { CreateInvoiceDto } from '../../../invoices/presentation/dto/create-invoice.dto';

export class CreateTripDto {
  @IsUUID()
  driverId: string;

  @IsUUID()
  passengerId: string;

  @IsLatitude()
  originLat: number;

  @IsLongitude()
  originLong: number;

  @IsLatitude()
  destLat: number;

  @IsLongitude()
  destLong: number;

  @IsOptional()
  @IsNumber()
  distanceKm?: number;

  @IsOptional()
  @IsNumber()
  durationSec?: number;

  @IsNumber()
  fare: number;

  @Length(3, 3)
  currency: string;

  @IsOptional()
  @IsEnum(TripStatus)
  status?: TripStatus = TripStatus.REQUESTED;


  @IsOptional()
  @ValidateNested()
  @Type(() => CreateInvoiceDto)
  invoice?: CreateInvoiceDto;
}
