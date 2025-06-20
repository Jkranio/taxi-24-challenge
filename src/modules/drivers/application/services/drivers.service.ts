import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { IDriverRepository } from '../../domain/repositories/driver.repository.interface';
import { Driver } from '../../domain/models/driver.model';
import { CreateDriverDto } from '../../presentation/dto/create-driver.dto';
import { UpdateDriverDto } from '../../presentation/dto/update-driver.dto';

@Injectable()
export class DriversService {
    constructor(
        @Inject(IDriverRepository)
        private readonly repo: IDriverRepository,
    ) { }

    async create(dto: CreateDriverDto): Promise<Driver> {
        const driver = new Driver({
            fullName: dto.fullName,
            phone: dto.phone,
            email: dto.email,
            vehiclePlate: dto.vehiclePlate,
            vehicleModel: dto.vehicleModel,
            driverLicense: dto.driverLicense,
            latitude: dto.latitude,
            longitude: dto.longitude,
            status: 'AVAILABLE',
            rating: 5.00, 
        });
        return this.repo.create(driver);
    }

    async findAll(): Promise<Driver[]> {
        return this.repo.findAll();
    }

    async findOne(id: string): Promise<Driver> {
        const p = await this.repo.findById(id);
        if (!p) throw new NotFoundException(`Driver ${id} no encontrado`);
        return p;
    }
    async findAllAvailable(): Promise<Driver[]> {
        return this.repo.findAllAvailable();
    }
    async update(id: string, dto: UpdateDriverDto): Promise<Driver> {
        const existing = await this.findOne(id);
        existing.updateDetails(dto.fullName ?? '', dto.phone ?? '', dto.email);
        return this.repo.update(existing);
    }

    async remove(id: string): Promise<void> {
        await this.findOne(id);
        await this.repo.delete(id);
    }
    async findNearby(lat: number, lng: number, radius: number): Promise<Driver[]> {
        return this.repo.findNearby(lat, lng, radius);
    }
    
}
