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
exports.DriverEntity = exports.DriverStatus = void 0;
const typeorm_1 = require("typeorm");
const trip_entity_1 = require("../../../trips/infrastructure/entities/trip.entity");
var DriverStatus;
(function (DriverStatus) {
    DriverStatus["AVAILABLE"] = "AVAILABLE";
    DriverStatus["ON_TRIP"] = "ON_TRIP";
    DriverStatus["OFFLINE"] = "OFFLINE";
})(DriverStatus || (exports.DriverStatus = DriverStatus = {}));
let DriverEntity = class DriverEntity {
    id;
    fullName;
    phone;
    email;
    vehiclePlate;
    vehicleModel;
    driverLicense;
    status;
    latitude;
    longitude;
    rating;
    createdAt;
    updatedAt;
    deletedAt;
    trips;
};
exports.DriverEntity = DriverEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], DriverEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'full_name', length: 120 }),
    __metadata("design:type", String)
], DriverEntity.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ length: 20 }),
    __metadata("design:type", String)
], DriverEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: true, length: 100 }),
    __metadata("design:type", String)
], DriverEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vehicle_plate', unique: true, length: 50 }),
    __metadata("design:type", String)
], DriverEntity.prototype, "vehiclePlate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'vehicle_model', length: 100 }),
    __metadata("design:type", String)
], DriverEntity.prototype, "vehicleModel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'driver_license', unique: true, length: 50 }),
    __metadata("design:type", String)
], DriverEntity.prototype, "driverLicense", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: DriverStatus, default: DriverStatus.OFFLINE }),
    __metadata("design:type", String)
], DriverEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', nullable: true }),
    __metadata("design:type", Number)
], DriverEntity.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', nullable: true }),
    __metadata("design:type", Number)
], DriverEntity.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 3, scale: 2, default: 5.0 }),
    __metadata("design:type", Number)
], DriverEntity.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], DriverEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], DriverEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], DriverEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => trip_entity_1.TripEntity, (t) => t.driver),
    __metadata("design:type", Array)
], DriverEntity.prototype, "trips", void 0);
exports.DriverEntity = DriverEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'drivers' })
], DriverEntity);
//# sourceMappingURL=driver.entity.js.map