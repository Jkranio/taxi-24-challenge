import { IDriverRepository } from '../../domain/repositories/driver.repository.interface';
import { Driver } from '../../domain/models/driver.model';
import { CreateDriverDto } from '../../presentation/dto/create-driver.dto';
import { UpdateDriverDto } from '../../presentation/dto/update-driver.dto';
export declare class DriversService {
    private readonly repo;
    constructor(repo: IDriverRepository);
    create(dto: CreateDriverDto): Promise<Driver>;
    findAll(): Promise<Driver[]>;
    findOne(id: string): Promise<Driver>;
    findAllAvailable(): Promise<Driver[]>;
    update(id: string, dto: UpdateDriverDto): Promise<Driver>;
    remove(id: string): Promise<void>;
    findNearby(lat: number, lng: number, radius: number): Promise<Driver[]>;
}
