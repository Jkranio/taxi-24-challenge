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
exports.InvoiceEntity = exports.PaymentMethod = void 0;
const typeorm_1 = require("typeorm");
const trip_entity_1 = require("../../../trips/infrastructure/entities/trip.entity");
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CASH"] = "CASH";
    PaymentMethod["CREDIT_CARD"] = "CREDIT_CARD";
    PaymentMethod["DEBIT_CARD"] = "DEBIT_CARD";
    PaymentMethod["TRANSFER"] = "TRANSFER";
})(PaymentMethod || (exports.PaymentMethod = PaymentMethod = {}));
let InvoiceEntity = class InvoiceEntity {
    id;
    tripId;
    trip;
    subtotal;
    tax;
    total;
    currency;
    paymentMethod;
    issuedAt;
};
exports.InvoiceEntity = InvoiceEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], InvoiceEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'trip_id' }),
    __metadata("design:type", String)
], InvoiceEntity.prototype, "tripId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => trip_entity_1.TripEntity),
    (0, typeorm_1.JoinColumn)({ name: 'trip_id' }),
    __metadata("design:type", trip_entity_1.TripEntity)
], InvoiceEntity.prototype, "trip", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], InvoiceEntity.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], InvoiceEntity.prototype, "tax", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], InvoiceEntity.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 3, name: 'currency' }),
    __metadata("design:type", String)
], InvoiceEntity.prototype, "currency", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PaymentMethod,
        name: 'payment_method',
    }),
    __metadata("design:type", String)
], InvoiceEntity.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'issued_at', type: 'timestamptz' }),
    __metadata("design:type", Date)
], InvoiceEntity.prototype, "issuedAt", void 0);
exports.InvoiceEntity = InvoiceEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'invoices' })
], InvoiceEntity);
//# sourceMappingURL=invoice.entity.js.map