"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TripsModule = void 0;
const common_1 = require("@nestjs/common");
const trips_controller_1 = require("./presentation/controllers/trips.controller");
const trips_service_1 = require("./application/services/trips.service");
const typeorm_1 = require("@nestjs/typeorm");
const trip_entity_1 = require("./infrastructure/entities/trip.entity");
const trip_repository_interface_1 = require("./domain/repositories/trip.repository.interface");
const trip_repository_1 = require("./infrastructure/repositories/trip.repository");
const drivers_module_1 = require("../drivers/drivers.module");
const passengers_module_1 = require("../passengers/passengers.module");
let TripsModule = class TripsModule {
};
exports.TripsModule = TripsModule;
exports.TripsModule = TripsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([trip_entity_1.TripEntity]), drivers_module_1.DriversModule, passengers_module_1.PassengersModule],
        controllers: [trips_controller_1.TripsController],
        providers: [
            trips_service_1.TripsService,
            {
                provide: trip_repository_interface_1.ITripRepository,
                useClass: trip_repository_1.TripRepository,
            },
        ],
        exports: [trips_service_1.TripsService],
    })
], TripsModule);
//# sourceMappingURL=trips.module.js.map