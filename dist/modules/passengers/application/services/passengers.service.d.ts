import { Passenger } from '../../domain/models/passenger.model';
import { IPassengerRepository } from '../../domain/repositories/passenger.repository.interface';
import { CreatePassengerDto } from '../../presentation/dto/create-passenger.dto';
import { UpdatePassengerDto } from '../../presentation/dto/update-passenger.dto';
import { Driver } from 'src/modules/drivers/domain/models/driver.model';
export declare class PassengersService {
    private readonly repo;
    constructor(repo: IPassengerRepository);
    create(dto: CreatePassengerDto): Promise<Passenger>;
    findAll(): Promise<Passenger[]>;
    findOne(id: string): Promise<Passenger>;
    update(id: string, dto: UpdatePassengerDto): Promise<Passenger>;
    remove(id: string): Promise<void>;
    findNearestDrivers(passengerId: string, lat: number, lng: number, limit?: number): Promise<Driver[]>;
}
