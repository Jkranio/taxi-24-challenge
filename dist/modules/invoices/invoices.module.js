"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicesModule = void 0;
const common_1 = require("@nestjs/common");
const invoices_controller_1 = require("./presentation/controllers/invoices.controller");
const invoices_service_1 = require("./application/services/invoices.service");
const typeorm_1 = require("@nestjs/typeorm");
const invoice_entity_1 = require("./infrastructure/entities/invoice.entity");
const invoice_repository_interface_1 = require("./domain/repositories/invoice.repository.interface");
const invoice_repository_1 = require("./infrastructure/repositories/invoice.repository");
const trips_module_1 = require("../trips/trips.module");
const trip_entity_1 = require("../trips/infrastructure/entities/trip.entity");
let InvoicesModule = class InvoicesModule {
};
exports.InvoicesModule = InvoicesModule;
exports.InvoicesModule = InvoicesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([invoice_entity_1.InvoiceEntity, trip_entity_1.TripEntity]), trips_module_1.TripsModule],
        controllers: [invoices_controller_1.InvoicesController],
        providers: [
            invoices_service_1.InvoicesService,
            {
                provide: invoice_repository_interface_1.IInvoiceRepository,
                useClass: invoice_repository_1.InvoiceRepository,
            },
        ],
        exports: [invoices_service_1.InvoicesService],
    })
], InvoicesModule);
//# sourceMappingURL=invoices.module.js.map