import { IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class NearbyDriversDto {
    @IsNumber()
    @Type(() => Number)
    lat: number;

    @IsNumber()
    @Type(() => Number)
    lng: number;

    @IsNumber()
    @Type(() => Number)
    @Min(0)
    @Max(10)
    radius: number = 3;
}