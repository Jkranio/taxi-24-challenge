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
exports.PassengerEntity = void 0;
const typeorm_1 = require("typeorm");
const trip_entity_1 = require("../../../trips/infrastructure/entities/trip.entity");
let PassengerEntity = class PassengerEntity {
    id;
    fullName;
    phone;
    email;
    createdAt;
    updatedAt;
    deletedAt;
    trips;
};
exports.PassengerEntity = PassengerEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PassengerEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 120, name: 'full_name' }),
    __metadata("design:type", String)
], PassengerEntity.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, unique: true }),
    __metadata("design:type", String)
], PassengerEntity.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true, nullable: true }),
    __metadata("design:type", String)
], PassengerEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], PassengerEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], PassengerEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], PassengerEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => trip_entity_1.TripEntity, (t) => t.passenger, {
        cascade: ['insert', 'update'],
    }),
    __metadata("design:type", Array)
], PassengerEntity.prototype, "trips", void 0);
exports.PassengerEntity = PassengerEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'passengers' })
], PassengerEntity);
//# sourceMappingURL=passenger.entity.js.map