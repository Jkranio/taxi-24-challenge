import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { TripsService } from '../../application/services/trips.service';
import { Trip } from '../../domain/models/trip.model';
import { CreateTripDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';


@Controller('trips')
export class TripsController {
    constructor(private readonly tripsService: TripsService) { }

    @Get()
    findAll(): Promise<Trip[]> {
        return this.tripsService.findAll();
    }

    @Get('active')
    findAllActive(): Promise<Trip[]> {
        return this.tripsService.findAllActive();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Trip> {
        return this.tripsService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreateTripDto): Promise<Trip> {
        return this.tripsService.create(dto);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateTripDto,
    ): Promise<Trip> {
        return this.tripsService.update(id, dto);
    }
    @Patch(':id/complete')
    complete(@Param('id') id: string): Promise<Trip> {
        return this.tripsService.complete(id);
    }
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string): Promise<void> {
        return this.tripsService.remove(id);
    }
}
