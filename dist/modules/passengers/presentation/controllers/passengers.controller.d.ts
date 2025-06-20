import { PassengersService } from '../../application/services/passengers.service';
import { CreatePassengerDto } from '../dto/create-passenger.dto';
import { UpdatePassengerDto } from '../dto/update-passenger.dto';
import { Passenger } from '../../domain/models/passenger.model';
import { NearestDriversDto } from '../dto/nearest-drivers.dto';
import { Driver } from 'src/modules/drivers/domain/models/driver.model';
export declare class PassengersController {
    private readonly svc;
    constructor(svc: PassengersService);
    findAll(): Promise<Passenger[]>;
    findOne(id: string): Promise<Passenger>;
    create(dto: CreatePassengerDto): Promise<Passenger>;
    update(id: string, dto: UpdatePassengerDto): Promise<Passenger>;
    remove(id: string): Promise<void>;
    findNearestDrivers(id: string, query: NearestDriversDto): Promise<Driver[]>;
}
