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
    Query,
  } from '@nestjs/common';
  import { PassengersService } from '../../application/services/passengers.service';
  import { CreatePassengerDto } from '../dto/create-passenger.dto';
  import { UpdatePassengerDto } from '../dto/update-passenger.dto';
  import { Passenger } from '../../domain/models/passenger.model';
import { NearestDriversDto } from '../dto/nearest-drivers.dto';
import { Driver } from 'src/modules/drivers/domain/models/driver.model';
  
  @Controller('passengers')
  export class PassengersController {
    constructor(private readonly svc: PassengersService) {}
  
    @Get()
    findAll(): Promise<Passenger[]> {
      return this.svc.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string): Promise<Passenger> {
      return this.svc.findOne(id);
    }
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreatePassengerDto): Promise<Passenger> {
      return this.svc.create(dto);
    }
  
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() dto: UpdatePassengerDto,
    ): Promise<Passenger> {
      return this.svc.update(id, dto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string): Promise<void> {
      return this.svc.remove(id);
    }
    @Get(':id/nearest-drivers')
    findNearestDrivers(
        @Param('id') id: string,
        @Query() query: NearestDriversDto
    ): Promise<Driver[]> {
        return this.svc.findNearestDrivers(id, query.lat, query.lng, query.limit);
    }
  }
  