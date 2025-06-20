import { TripsService } from '../../application/services/trips.service';
import { Trip } from '../../domain/models/trip.model';
import { CreateTripDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';
export declare class TripsController {
    private readonly tripsService;
    constructor(tripsService: TripsService);
    findAll(): Promise<Trip[]>;
    findAllActive(): Promise<Trip[]>;
    findOne(id: string): Promise<Trip>;
    create(dto: CreateTripDto): Promise<Trip>;
    update(id: string, dto: UpdateTripDto): Promise<Trip>;
    complete(id: string): Promise<Trip>;
    remove(id: string): Promise<void>;
}
