"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const trip_entity_1 = require("./modules/trips/infrastructure/entities/trip.entity");
const passenger_entity_1 = require("./modules/passengers/infrastructure/entities/passenger.entity");
const invoice_entity_1 = require("./modules/invoices/infrastructure/entities/invoice.entity");
const passengers_module_1 = require("./modules/passengers/passengers.module");
const drivers_module_1 = require("./modules/drivers/drivers.module");
const trips_module_1 = require("./modules/trips/trips.module");
const invoices_module_1 = require("./modules/invoices/invoices.module");
const driver_entity_1 = require("./modules/drivers/infrastructure/entities/driver.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [passengers_module_1.PassengersModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => {
                    console.log('Full Database Config:', {
                        host: process.env.DB_HOST,
                        port: process.env.DB_PORT,
                        username: process.env.DB_USERNAME,
                        password: process.env.DB_PASSWORD,
                        database: process.env.DB_NAME,
                        nodeEnv: process.env.NODE_ENV
                    });
                    return {
                        type: 'postgres',
                        host: process.env.DB_HOST,
                        port: parseInt(process.env.DB_PORT || '5433'),
                        username: process.env.DB_USERNAME,
                        password: process.env.DB_PASSWORD,
                        database: process.env.DB_NAME,
                        entities: [driver_entity_1.DriverEntity, trip_entity_1.TripEntity, passenger_entity_1.PassengerEntity, invoice_entity_1.InvoiceEntity],
                        synchronize: process.env.NODE_ENV !== 'production',
                        logging: true,
                        ssl: false,
                        retryAttempts: 3,
                        retryDelay: 3000,
                    };
                },
                inject: [config_1.ConfigService],
            }),
            drivers_module_1.DriversModule,
            trips_module_1.TripsModule,
            invoices_module_1.InvoicesModule,],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map