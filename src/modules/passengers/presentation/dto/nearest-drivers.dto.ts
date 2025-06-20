
import { Type } from 'class-transformer';
import { IsLatitude, IsLongitude, IsNumber, IsOptional } from 'class-validator';

export class NearestDriversDto {
    @IsNumber()
    @IsLatitude()
    @Type(() => Number)
    lat: number;

    @IsNumber()
    @IsLongitude()
    @Type(() => Number)
    lng: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    limit: number = 3;
}