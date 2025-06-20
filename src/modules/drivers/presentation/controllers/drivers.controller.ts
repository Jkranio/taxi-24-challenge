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
    UsePipes,
    ValidationPipe,
    Query,
} from '@nestjs/common';
import { DriversService } from '../../application/services/drivers.service';
import { Driver } from '../../domain/models/driver.model';
import { CreateDriverDto } from '../dto/create-driver.dto';
import { UpdateDriverDto } from '../dto/update-driver.dto';
import { NearbyDriversDto } from '../dto/near-by-drivers.dto';

@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
@Controller('drivers')
export class DriversController {
    constructor(private readonly driversService: DriversService) { }

    @Get()
    findAll(): Promise<Driver[]> {
        return this.driversService.findAll();
    }
    @Get('available')
    findAllAvailable(): Promise<Driver[]> {
        return this.driversService.findAllAvailable();
    }
    @Get('nearby')
    findNearby(@Query() query: NearbyDriversDto): Promise<Driver[]> {
        return this.driversService.findNearby(query.lat, query.lng, query.radius);
    }
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Driver> {
        return this.driversService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreateDriverDto): Promise<Driver> {
        return this.driversService.create(dto);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateDriverDto,
    ): Promise<Driver> {
        return this.driversService.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string): Promise<void> {
        return this.driversService.remove(id);
    }
}
