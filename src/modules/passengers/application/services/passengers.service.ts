import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Passenger } from '../../domain/models/passenger.model';
import {
  IPassengerRepository,
} from '../../domain/repositories/passenger.repository.interface';
import { CreatePassengerDto } from '../../presentation/dto/create-passenger.dto';
import { UpdatePassengerDto } from '../../presentation/dto/update-passenger.dto';
import { Driver } from 'src/modules/drivers/domain/models/driver.model';

@Injectable()
export class PassengersService {
  constructor(
    @Inject(IPassengerRepository)
    private readonly repo: IPassengerRepository,
  ) {}

  async create(dto: CreatePassengerDto): Promise<Passenger> {
    const passenger = new Passenger({
      fullName: dto.fullName,
      phone: dto.phone,
      email: dto.email,
    });
    return this.repo.create(passenger);
  }

  async findAll(): Promise<Passenger[]> {
    return this.repo.findAll();
  }

  async findOne(id: string): Promise<Passenger> {
    const p = await this.repo.findById(id);
    if (!p) throw new NotFoundException(`Passenger ${id} no encontrado`);
    return p;
  }

  async update(id: string, dto: UpdatePassengerDto): Promise<Passenger> {
    const existing = await this.findOne(id);
    existing.updateDetails(dto.fullName ?? '', dto.phone ?? '', dto.email);
    return this.repo.update(existing);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.repo.delete(id);
  }

  async findNearestDrivers(
    passengerId: string,
    lat: number,
    lng: number,
    limit: number = 3
): Promise<Driver[]> {

    return this.repo.findNearestDrivers(lat, lng, limit);
}
}
