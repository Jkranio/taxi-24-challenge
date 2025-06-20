import { DriversService } from '../../application/services/drivers.service';
import { Driver } from '../../domain/models/driver.model';
import { CreateDriverDto } from '../dto/create-driver.dto';
import { UpdateDriverDto } from '../dto/update-driver.dto';
import { NearbyDriversDto } from '../dto/near-by-drivers.dto';
export declare class DriversController {
    private readonly driversService;
    constructor(driversService: DriversService);
    findAll(): Promise<Driver[]>;
    findAllAvailable(): Promise<Driver[]>;
    findNearby(query: NearbyDriversDto): Promise<Driver[]>;
    findOne(id: string): Promise<Driver>;
    create(dto: CreateDriverDto): Promise<Driver>;
    update(id: string, dto: UpdateDriverDto): Promise<Driver>;
    remove(id: string): Promise<void>;
}
