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
exports.PassengerRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const passenger_entity_1 = require("../entities/passenger.entity");
const passenger_model_1 = require("../../domain/models/passenger.model");
const trip_entity_1 = require("../../../trips/infrastructure/entities/trip.entity");
const trip_model_1 = require("../../../trips/domain/models/trip.model");
const driver_repository_interface_1 = require("../../../drivers/domain/repositories/driver.repository.interface");
let PassengerRepository = class PassengerRepository {
    repo;
    tripRepo;
    driverRepository;
    constructor(repo, tripRepo, driverRepository) {
        this.repo = repo;
        this.tripRepo = tripRepo;
        this.driverRepository = driverRepository;
    }
    toEntity(domain) {
        return this.repo.create({
            id: domain.id,
            fullName: domain.fullName,
            phone: domain.phone,
            email: domain.email,
            deletedAt: domain.deletedAt,
            trips: domain.trips?.map(t => this.tripRepo.create({ id: t.getId?.() ?? t.getId() })),
        });
    }
    toDomain(e) {
        return new passenger_model_1.Passenger({
            id: e.id,
            fullName: e.fullName,
            phone: e.phone,
            email: e.email,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt,
            deletedAt: e.deletedAt,
            trips: e.trips?.map(t => new trip_model_1.Trip({
                id: t.id,
                driverId: t.driver?.id,
                passengerId: t.passenger?.id,
                originLat: t.originLat,
                originLong: t.originLong,
                destLat: t.destLat,
                destLong: t.destLong,
                distanceKm: t.distanceKm,
                durationSec: t.durationSec,
                status: t.status,
                requestedAt: t.requestedAt,
                startedAt: t.startedAt,
                finishedAt: t.finishedAt,
                updatedAt: t.updatedAt,
            })) ?? [],
        });
    }
    async create(domain) {
        const saved = await this.repo.save(this.toEntity(domain));
        return this.toDomain(saved);
    }
    async update(passenger) {
        const existing = await this.repo.findOne({
            where: { id: passenger.getId() },
            relations: { trips: true }
        });
        if (!existing) {
            throw new common_1.NotFoundException('Passenger not found');
        }
        const entityToUpdate = this.toEntity(passenger);
        const saved = await this.repo.save({
            ...existing,
            ...entityToUpdate,
            updatedAt: new Date()
        });
        return this.toDomain(saved);
    }
    async findById(id) {
        const entity = await this.repo.findOne({
            where: { id },
            relations: { trips: true },
        });
        if (!entity)
            throw new common_1.NotFoundException('Passenger not found');
        return this.toDomain(entity);
    }
    async findAll() {
        const list = await this.repo.find({ relations: { trips: true } });
        return list.map((e) => this.toDomain(e));
    }
    async delete(id) {
        await this.repo.softDelete({ id });
    }
    async findNearestDrivers(originLat, originLong, limit) {
        const nearbyDrivers = await this.driverRepository.findNearby(originLat, originLong, limit);
        return nearbyDrivers;
    }
};
exports.PassengerRepository = PassengerRepository;
exports.PassengerRepository = PassengerRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(passenger_entity_1.PassengerEntity)),
    __param(1, (0, typeorm_2.InjectRepository)(trip_entity_1.TripEntity)),
    __param(2, (0, common_1.Inject)(driver_repository_interface_1.IDriverRepository)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository, Object])
], PassengerRepository);
//# sourceMappingURL=passengers.repository.js.map