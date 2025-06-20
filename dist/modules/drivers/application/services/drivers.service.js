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
exports.DriversService = void 0;
const common_1 = require("@nestjs/common");
const driver_repository_interface_1 = require("../../domain/repositories/driver.repository.interface");
const driver_model_1 = require("../../domain/models/driver.model");
let DriversService = class DriversService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async create(dto) {
        const driver = new driver_model_1.Driver({
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
    async findAll() {
        return this.repo.findAll();
    }
    async findOne(id) {
        const p = await this.repo.findById(id);
        if (!p)
            throw new common_1.NotFoundException(`Driver ${id} no encontrado`);
        return p;
    }
    async findAllAvailable() {
        return this.repo.findAllAvailable();
    }
    async update(id, dto) {
        const existing = await this.findOne(id);
        existing.updateDetails(dto.fullName ?? '', dto.phone ?? '', dto.email);
        return this.repo.update(existing);
    }
    async remove(id) {
        await this.findOne(id);
        await this.repo.delete(id);
    }
    async findNearby(lat, lng, radius) {
        return this.repo.findNearby(lat, lng, radius);
    }
};
exports.DriversService = DriversService;
exports.DriversService = DriversService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(driver_repository_interface_1.IDriverRepository)),
    __metadata("design:paramtypes", [Object])
], DriversService);
//# sourceMappingURL=drivers.service.js.map