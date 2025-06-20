"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassengersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const passenger_entity_1 = require("./infrastructure/entities/passenger.entity");
const passengers_controller_1 = require("./presentation/controllers/passengers.controller");
const passengers_service_1 = require("./application/services/passengers.service");
const passenger_repository_interface_1 = require("./domain/repositories/passenger.repository.interface");
const passengers_repository_1 = require("./infrastructure/repositories/passengers.repository");
const trip_entity_1 = require("../trips/infrastructure/entities/trip.entity");
const drivers_module_1 = require("../drivers/drivers.module");
let PassengersModule = class PassengersModule {
};
exports.PassengersModule = PassengersModule;
exports.PassengersModule = PassengersModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([passenger_entity_1.PassengerEntity, trip_entity_1.TripEntity]),
            drivers_module_1.DriversModule
        ],
        providers: [
            passengers_service_1.PassengersService,
            {
                provide: passenger_repository_interface_1.IPassengerRepository,
                useClass: passengers_repository_1.PassengerRepository
            }
        ],
        controllers: [passengers_controller_1.PassengersController],
        exports: [passengers_service_1.PassengersService]
    })
], PassengersModule);
//# sourceMappingURL=passengers.module.js.map