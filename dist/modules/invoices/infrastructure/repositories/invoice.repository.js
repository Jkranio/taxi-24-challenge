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
exports.InvoiceRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const invoice_entity_1 = require("../entities/invoice.entity");
const invoice_model_1 = require("../../domain/models/invoice.model");
const trip_model_1 = require("../../../trips/domain/models/trip.model");
const trip_entity_1 = require("../../../trips/infrastructure/entities/trip.entity");
let InvoiceRepository = class InvoiceRepository {
    repo;
    tripRepo;
    constructor(repo, tripRepo) {
        this.repo = repo;
        this.tripRepo = tripRepo;
    }
    toEntity(domain) {
        const entity = new invoice_entity_1.InvoiceEntity();
        entity.id = domain.getId();
        entity.tripId = domain.getTripId() ?? '';
        entity.subtotal = domain.getSubtotal();
        entity.tax = domain.getTax();
        entity.total = domain.getTotal();
        entity.paymentMethod = domain.getPaymentMethod();
        entity.issuedAt = domain.getIssuedAt();
        return entity;
    }
    toDomain(e) {
        return new invoice_model_1.Invoice({
            id: e.id,
            tripId: e.tripId,
            subtotal: e.subtotal,
            tax: e.tax,
            total: e.total,
            paymentMethod: e.paymentMethod,
            issuedAt: e.issuedAt,
            trip: e.trip
                ? new trip_model_1.Trip({
                    id: e.trip.id,
                    driverId: e.trip.driver?.id,
                    passengerId: e.trip.passenger?.id,
                    fare: e.trip.fare,
                    currency: e.trip.currency,
                    status: e.trip.status,
                    originLat: e.trip.originLat,
                    originLong: e.trip.originLong,
                    destLat: e.trip.destLat,
                    destLong: e.trip.destLong,
                    requestedAt: e.trip.requestedAt,
                })
                : new trip_model_1.Trip({
                    id: '',
                    driverId: undefined,
                    passengerId: '',
                    fare: 0,
                    currency: '',
                    status: undefined,
                    originLat: 0,
                    originLong: 0,
                    destLat: 0,
                    destLong: 0,
                    requestedAt: new Date(0),
                }),
        });
    }
    async create(invoice) {
        const trip = await this.tripRepo.findOne({
            where: { id: invoice.getTripId() }
        });
        if (!trip) {
            throw new common_1.NotFoundException('Trip not found');
        }
        const entity = this.toEntity(invoice);
        const saved = await this.repo.save(entity);
        return this.toDomain(saved);
    }
    async update(invoice) {
        const existing = await this.repo.findOne({
            where: { id: invoice.getId() },
            relations: { trip: { driver: true, passenger: true } }
        });
        if (!existing) {
            throw new common_1.NotFoundException('Invoice not found');
        }
        const entityToUpdate = this.toEntity(invoice);
        const saved = await this.repo.save({
            ...existing,
            ...entityToUpdate,
            updatedAt: new Date()
        });
        return this.toDomain(saved);
    }
    async findById(id) {
        const e = await this.repo.findOne({
            where: { id },
            relations: { trip: { driver: true, passenger: true } },
        });
        if (!e)
            throw new common_1.NotFoundException('Invoice not found');
        return this.toDomain(e);
    }
    async findAll() {
        const list = await this.repo.find({ relations: { trip: true } });
        return list.map((e) => this.toDomain(e));
    }
    async delete(id) {
        await this.repo.softDelete({ id });
    }
};
exports.InvoiceRepository = InvoiceRepository;
exports.InvoiceRepository = InvoiceRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(invoice_entity_1.InvoiceEntity)),
    __param(1, (0, typeorm_2.InjectRepository)(trip_entity_1.TripEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], InvoiceRepository);
//# sourceMappingURL=invoice.repository.js.map