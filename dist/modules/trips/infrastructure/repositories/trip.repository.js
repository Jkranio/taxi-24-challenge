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
exports.TripRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const trip_entity_1 = require("../entities/trip.entity");
const trip_model_1 = require("../../domain/models/trip.model");
let TripRepository = class TripRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    toEntity(domain) {
        return this.repo.create({
            id: domain.getId(),
            driver: domain.getDriverId()
                ? { id: domain.getDriverId() }
                : undefined,
            passenger: domain.getPassengerId()
                ? { id: domain.getPassengerId() }
                : undefined,
            originLat: domain.getOriginLat(),
            originLong: domain.getOriginLong(),
            destLat: domain.getDestLat(),
            destLong: domain.getDestLong(),
            distanceKm: domain.getDistanceKm(),
            durationSec: domain.getDurationSec(),
            fare: domain.getFare(),
            currency: domain.getCurrency(),
            status: domain.getStatus(),
            requestedAt: domain.getRequestedAt(),
            startedAt: domain.getStartedAt(),
            finishedAt: domain.getFinishedAt(),
            updatedAt: domain.getUpdatedAt(),
            invoice: domain.getInvoiceId()
                ? { id: domain.getInvoiceId() }
                : undefined,
        });
    }
    async findAllActive() {
        const list = await this.repo.find({
            where: {
                status: (0, typeorm_1.In)([trip_entity_1.TripStatus.REQUESTED, trip_entity_1.TripStatus.ONGOING])
            },
            relations: {
                driver: true,
                passenger: true,
                invoice: true
            },
        });
        return list.map((e) => this.toDomain(e));
    }
    async complete(id) {
        const trip = await this.findById(id);
        trip.complete();
        return this.update(trip);
    }
    toDomain(e) {
        return new trip_model_1.Trip({
            id: e.id,
            driverId: e.driver?.id,
            passengerId: e.passenger?.id,
            originLat: e.originLat,
            originLong: e.originLong,
            destLat: e.destLat,
            destLong: e.destLong,
            distanceKm: e.distanceKm,
            durationSec: e.durationSec,
            fare: e.fare,
            currency: e.currency,
            status: e.status,
            requestedAt: e.requestedAt,
            startedAt: e.startedAt,
            finishedAt: e.finishedAt,
            updatedAt: e.updatedAt,
            driver: e.driver ? {
                id: e.driver.id,
                fullName: e.driver.fullName,
                phone: e.driver.phone,
                email: e.driver.email,
                vehiclePlate: e.driver.vehiclePlate,
                vehicleModel: e.driver.vehicleModel,
                status: e.driver.status,
                latitude: e.driver.latitude,
                longitude: e.driver.longitude,
                rating: e.driver.rating
            } : undefined,
            passenger: e.passenger ? {
                id: e.passenger.id,
                fullName: e.passenger.fullName,
                phone: e.passenger.phone,
                email: e.passenger.email
            } : undefined,
        });
    }
    async create(domain) {
        const saved = await this.repo.save(this.toEntity(domain));
        return this.toDomain(saved);
    }
    async update(trip) {
        const existing = await this.repo.findOne({
            where: { id: trip.getId() },
            relations: { driver: true, passenger: true, invoice: true }
        });
        if (!existing) {
            throw new common_1.NotFoundException('Trip not found');
        }
        const entityToUpdate = this.toEntity(trip);
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
            relations: { driver: true, passenger: true, invoice: true },
        });
        if (!entity)
            throw new common_1.NotFoundException('Trip not found');
        return this.toDomain(entity);
    }
    async findAll() {
        const list = await this.repo.find({
            relations: { driver: true, passenger: true, invoice: true },
        });
        return list.map((e) => this.toDomain(e));
    }
    async delete(id) {
        await this.repo.softDelete({ id });
    }
};
exports.TripRepository = TripRepository;
exports.TripRepository = TripRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(trip_entity_1.TripEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], TripRepository);
//# sourceMappingURL=trip.repository.js.map