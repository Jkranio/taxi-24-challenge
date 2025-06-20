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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTripDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const trip_entity_1 = require("../../infrastructure/entities/trip.entity");
const create_invoice_dto_1 = require("../../../invoices/presentation/dto/create-invoice.dto");
class CreateTripDto {
    driverId;
    passengerId;
    originLat;
    originLong;
    destLat;
    destLong;
    distanceKm;
    durationSec;
    fare;
    currency;
    status = trip_entity_1.TripStatus.REQUESTED;
    invoice;
}
exports.CreateTripDto = CreateTripDto;
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTripDto.prototype, "driverId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateTripDto.prototype, "passengerId", void 0);
__decorate([
    (0, class_validator_1.IsLatitude)(),
    __metadata("design:type", Number)
], CreateTripDto.prototype, "originLat", void 0);
__decorate([
    (0, class_validator_1.IsLongitude)(),
    __metadata("design:type", Number)
], CreateTripDto.prototype, "originLong", void 0);
__decorate([
    (0, class_validator_1.IsLatitude)(),
    __metadata("design:type", Number)
], CreateTripDto.prototype, "destLat", void 0);
__decorate([
    (0, class_validator_1.IsLongitude)(),
    __metadata("design:type", Number)
], CreateTripDto.prototype, "destLong", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateTripDto.prototype, "distanceKm", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateTripDto.prototype, "durationSec", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateTripDto.prototype, "fare", void 0);
__decorate([
    (0, class_validator_1.Length)(3, 3),
    __metadata("design:type", String)
], CreateTripDto.prototype, "currency", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(trip_entity_1.TripStatus),
    __metadata("design:type", String)
], CreateTripDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => create_invoice_dto_1.CreateInvoiceDto),
    __metadata("design:type", create_invoice_dto_1.CreateInvoiceDto)
], CreateTripDto.prototype, "invoice", void 0);
//# sourceMappingURL=create-trip.dto.js.map