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
exports.TripEntity = exports.TripStatus = void 0;
const typeorm_1 = require("typeorm");
const passenger_entity_1 = require("../../../passengers/infrastructure/entities/passenger.entity");
const invoice_entity_1 = require("../../../invoices/infrastructure/entities/invoice.entity");
const driver_entity_1 = require("../../../drivers/infrastructure/entities/driver.entity");
var TripStatus;
(function (TripStatus) {
    TripStatus["REQUESTED"] = "REQUESTED";
    TripStatus["ONGOING"] = "ONGOING";
    TripStatus["FINISHED"] = "FINISHED";
    TripStatus["CANCELLED"] = "CANCELLED";
    TripStatus["NO_SHOW"] = "NO_SHOW";
})(TripStatus || (exports.TripStatus = TripStatus = {}));
let TripEntity = class TripEntity {
    id;
    driver;
    passenger;
    invoice;
    originLat;
    originLong;
    destLat;
    destLong;
    distanceKm;
    durationSec;
    fare;
    currency;
    status;
    requestedAt;
    startedAt;
    finishedAt;
    updatedAt;
};
exports.TripEntity = TripEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], TripEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ManyToOne)(() => driver_entity_1.DriverEntity, (d) => d.trips, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'driver_id' }),
    __metadata("design:type", driver_entity_1.DriverEntity)
], TripEntity.prototype, "driver", void 0);
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ManyToOne)(() => passenger_entity_1.PassengerEntity, (p) => p.trips, { eager: false }),
    (0, typeorm_1.JoinColumn)({ name: 'passenger_id' }),
    __metadata("design:type", passenger_entity_1.PassengerEntity)
], TripEntity.prototype, "passenger", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => invoice_entity_1.InvoiceEntity, invoice => invoice.trip),
    __metadata("design:type", invoice_entity_1.InvoiceEntity)
], TripEntity.prototype, "invoice", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', name: 'origin_lat' }),
    __metadata("design:type", Number)
], TripEntity.prototype, "originLat", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', name: 'origin_long' }),
    __metadata("design:type", Number)
], TripEntity.prototype, "originLong", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', name: 'dest_lat' }),
    __metadata("design:type", Number)
], TripEntity.prototype, "destLat", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', name: 'dest_long' }),
    __metadata("design:type", Number)
], TripEntity.prototype, "destLong", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', name: 'distanceKm', precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], TripEntity.prototype, "distanceKm", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer', name: 'duration_sec', nullable: true }),
    __metadata("design:type", Number)
], TripEntity.prototype, "durationSec", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric' }),
    __metadata("design:type", Number)
], TripEntity.prototype, "fare", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 3, name: 'currency' }),
    __metadata("design:type", String)
], TripEntity.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: TripStatus, default: TripStatus.REQUESTED }),
    __metadata("design:type", String)
], TripEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'requested_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], TripEntity.prototype, "requestedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'started_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], TripEntity.prototype, "startedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'finished_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], TripEntity.prototype, "finishedAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], TripEntity.prototype, "updatedAt", void 0);
exports.TripEntity = TripEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'trips' })
], TripEntity);
//# sourceMappingURL=trip.entity.js.map