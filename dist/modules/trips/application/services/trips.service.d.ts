import { ITripRepository } from '../../domain/repositories/trip.repository.interface';
import { CreateTripDto } from '../../presentation/dto/create-trip.dto';
import { Trip } from '../../domain/models/trip.model';
import { UpdateTripDto } from '../../presentation/dto/update-trip.dto';
import { DriversService } from 'src/modules/drivers/application/services/drivers.service';
import { PassengersService } from 'src/modules/passengers/application/services/passengers.service';
export declare class TripsService {
    private readonly repo;
    private readonly driverService;
    private readonly passengerService;
    constructor(repo: ITripRepository, driverService: DriversService, passengerService: PassengersService);
    create(dto: CreateTripDto): Promise<Trip>;
    findAll(): Promise<Trip[]>;
    findAllActive(): Promise<Trip[]>;
    complete(id: string): Promise<Trip>;
    findOne(id: string): Promise<Trip>;
    update(id: string, dto: UpdateTripDto): Promise<Trip>;
    remove(id: string): Promise<void>;
}
