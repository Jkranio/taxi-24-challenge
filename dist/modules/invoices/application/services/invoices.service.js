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
exports.InvoicesService = void 0;
const common_1 = require("@nestjs/common");
const invoice_repository_interface_1 = require("../../domain/repositories/invoice.repository.interface");
const invoice_model_1 = require("../../domain/models/invoice.model");
const trips_service_1 = require("../../../trips/application/services/trips.service");
let InvoicesService = class InvoicesService {
    repo;
    tripsService;
    constructor(repo, tripsService) {
        this.repo = repo;
        this.tripsService = tripsService;
    }
    async create(dto) {
        const existingInvoice = await this.repo.findById(dto.tripId);
        if (existingInvoice) {
            throw new common_1.ConflictException('Invoice already exists for this trip');
        }
        const trip = await this.tripsService.findOne(dto.tripId);
        const invoice = new invoice_model_1.Invoice({
            tripId: dto.tripId,
            subtotal: dto.subtotal,
            tax: dto.tax,
            total: dto.total,
            paymentMethod: dto.paymentMethod,
            issuedAt: new Date(),
            trip: trip,
        });
        return this.repo.create(invoice);
    }
    async findAll() {
        return this.repo.findAll();
    }
    async findOne(id) {
        const p = await this.repo.findById(id);
        if (!p)
            throw new common_1.NotFoundException(`Invoice ${id} no encontrado`);
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
exports.InvoicesService = InvoicesService;
exports.InvoicesService = InvoicesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(invoice_repository_interface_1.IInvoiceRepository)),
    __metadata("design:paramtypes", [Object, trips_service_1.TripsService])
], InvoicesService);
//# sourceMappingURL=invoices.service.js.map