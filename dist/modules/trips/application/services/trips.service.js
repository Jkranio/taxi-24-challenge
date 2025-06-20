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
exports.TripsService = void 0;
const common_1 = require("@nestjs/common");
const trip_repository_interface_1 = require("../../domain/repositories/trip.repository.interface");
const trip_model_1 = require("../../domain/models/trip.model");
const drivers_service_1 = require("../../../drivers/application/services/drivers.service");
const passengers_service_1 = require("../../../passengers/application/services/passengers.service");
let TripsService = class TripsService {
    repo;
    driverService;
    passengerService;
    constructor(repo, driverService, passengerService) {
        this.repo = repo;
        this.driverService = driverService;
        this.passengerService = passengerService;
    }
    async create(dto) {
        const driver = await this.driverService.findOne(dto.driverId);
        const passenger = await this.passengerService.findOne(dto.passengerId);
        if (!driver) {
            throw new common_1.NotFoundException('Driver not found');
        }
        const trip = new trip_model_1.Trip({
            driverId: dto.driverId,
            passengerId: dto.passengerId,
            status: dto.status,
            originLat: dto.originLat,
            originLong: dto.originLong,
            destLat: dto.destLat,
            destLong: dto.destLong,
            fare: dto.fare,
            currency: dto.currency,
            requestedAt: new Date(),
            startedAt: undefined,
            finishedAt: undefined,
            updatedAt: new Date(),
            driver: driver,
            passenger: passenger,
        });
        return this.repo.create(trip);
    }
    async findAll() {
        return this.repo.findAll();
    }
    async findAllActive() {
        return this.repo.findAllActive();
    }
    async complete(id) {
        return this.repo.complete(id);
    }
    async findOne(id) {
        const p = await this.repo.findById(id);
        if (!p)
            throw new common_1.NotFoundException(`Trip ${id} no encontrado`);
        return p;
    }
    async update(id, dto) {
        const existing = await this.findOne(id);
        return this.repo.update(existing);
    }
    async remove(id) {
        await this.findOne(id);
        await this.repo.delete(id);
    }
};
exports.TripsService = TripsService;
exports.TripsService = TripsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(trip_repository_interface_1.ITripRepository)),
    __metadata("design:paramtypes", [Object, drivers_service_1.DriversService,
        passengers_service_1.PassengersService])
], TripsService);
//# sourceMappingURL=trips.service.js.map