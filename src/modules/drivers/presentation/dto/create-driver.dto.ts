import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsNumber,
  IsLatitude,
  IsLongitude,
  Length,
  IsUUID,
} from 'class-validator';
import { DriverStatus } from '../../infrastructure/entities/driver.entity';

export class CreateDriverDto {
  @IsString()
  @Length(3, 120)
  fullName: string;

  @IsString()
  @Length(8, 20)
  phone: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @Length(1, 50)
  vehiclePlate: string;

  @IsString()
  @Length(1, 100)
  vehicleModel: string;

  @IsString()
  @Length(1, 50)
  driverLicense: string;

  @IsOptional()
  @IsEnum(DriverStatus)
  status?: DriverStatus;

  @IsOptional()
  @IsLatitude()
  latitude?: number;

  @IsOptional()
  @IsLongitude()
  longitude?: number;
}
