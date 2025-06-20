"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DriversModule = void 0;
const common_1 = require("@nestjs/common");
const drivers_controller_1 = require("./presentation/controllers/drivers.controller");
const drivers_service_1 = require("./application/services/drivers.service");
const typeorm_1 = require("@nestjs/typeorm");
const driver_entity_1 = require("./infrastructure/entities/driver.entity");
const driver_repository_interface_1 = require("./domain/repositories/driver.repository.interface");
const driver_repository_1 = require("./infrastructure/repositories/driver.repository");
let DriversModule = class DriversModule {
};
exports.DriversModule = DriversModule;
exports.DriversModule = DriversModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([driver_entity_1.DriverEntity])],
        controllers: [drivers_controller_1.DriversController],
        providers: [drivers_service_1.DriversService, {
                provide: driver_repository_interface_1.IDriverRepository,
                useClass: driver_repository_1.DriverRepository
            },
        ], exports: [drivers_service_1.DriversService, driver_repository_interface_1.IDriverRepository]
    })
], DriversModule);
//# sourceMappingURL=drivers.module.js.map