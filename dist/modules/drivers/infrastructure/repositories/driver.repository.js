"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriverRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const driver_entity_1 = require("../entities/driver.entity");
const driver_model_1 = require("../../domain/models/driver.model");
const trip_model_1 = require("../../../trips/domain/models/trip.model");
let DriverRepository = class DriverRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    toEntity(domain) {
        console.log('Converting domain to entity:', domain);
        return this.repo.create({
            id: domain.id,
            fullName: domain.fullName,
            phone: domain.phone,
            email: domain.email,
            vehiclePlate: domain.vehiclePlate,
            vehicleModel: domain.vehicleModel,
            driverLicense: domain.driverLicense,
            status: (domain.status ?? driver_entity_1.DriverStatus.OFFLINE),
            latitude: domain.latitude,
            longitude: domain.longitude,
            rating: domain.rating,
            deletedAt: domain.deletedAt,
            trips: domain.trips?.map((t) => ({ id: t.getId() })),
        });
    }
    toDomain(e) {
        return new driver_model_1.Driver({
            id: e.id,
            fullName: e.fullName,
            phone: e.phone,
            email: e.email,
            vehiclePlate: e.vehiclePlate,
            vehicleModel: e.vehicleModel,
            driverLicense: e.driverLicense,
            status: e.status,
            latitude: e.latitude,
            longitude: e.longitude,
            rating: e.rating,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt,
            deletedAt: e.deletedAt,
            trips: e.trips?.map((t) => new trip_model_1.Trip({
                id: t.id,
                passengerId: t.passenger?.id || '',
                originLat: t.originLat || 0,
                originLong: t.originLong || 0,
                destLat: t.destLat || 0,
                destLong: t.destLong || 0,
                status: t.status,
                driverId: t.driver?.id,
                fare: t.fare,
                currency: t.currency,
                requestedAt: t.requestedAt || new Date()
            })) ?? [],
        });
    }
    async create(domain) {
        console.log('Creating driver:', domain);
        const saved = await this.repo.save(this.toEntity(domain));
        return this.toDomain(saved);
    }
    async update(driver) {
        const existing = await this.repo.findOne({
            where: { id: driver.getId() },
            relations: { trips: true }
        });
        if (!existing) {
            throw new common_1.NotFoundException('Driver not found');
        }
        const entityToUpdate = this.toEntity(driver);
        const saved = await this.repo.save({
            ...existing,
            ...entityToUpdate,
            updatedAt: new Date()
        });
        return this.toDomain(saved);
    }
    async findAllAvailable() {
        const list = await this.repo.find({
            where: {
                status: driver_entity_1.DriverStatus.AVAILABLE,
                deletedAt: (0, typeorm_1.IsNull)(),
            },
            relations: { trips: true }
        });
        return list.map(e => this.toDomain(e));
    }
    async findById(id) {
        const e = await this.repo.findOne({
            where: { id },
            relations: { trips: true },
        });
        if (!e)
            throw new common_1.NotFoundException('Driver not found');
        return this.toDomain(e);
    }
    async findAll() {
        const list = await this.repo.find({ relations: { trips: true } });
        return list.map((e) => this.toDomain(e));
    }
    async delete(id) {
        await this.repo.softDelete({ id });
    }
    async findNearby(lat, lng, radiusKm = 3) {
        const drivers = await this.repo
            .createQueryBuilder('driver')
            .where('driver.status = :status', { status: 'AVAILABLE' })
            .andWhere('driver.deletedAt IS NULL')
            .andWhere(`
                (6371 * acos(
                    cos(radians(:lat)) * 
                    cos(radians(driver.latitude)) * 
                    cos(radians(driver.longitude) - radians(:lng)) + 
                    sin(radians(:lat)) * 
                    sin(radians(driver.latitude))
                )) <= :radius
            `)
            .setParameters({
            lat,
            lng,
            radius: radiusKm
        })
            .getMany();
        return drivers.map(driver => this.toDomain(driver));
    }
};
exports.DriverRepository = DriverRepository;
exports.DriverRepository = DriverRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(driver_entity_1.DriverEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], DriverRepository);
//# sourceMappingURL=driver.repository.js.map