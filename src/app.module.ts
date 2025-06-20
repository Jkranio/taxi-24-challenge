import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';



import { TripEntity } from './modules/trips/infrastructure/entities/trip.entity';
import { PassengerEntity } from './modules/passengers/infrastructure/entities/passenger.entity';
import { InvoiceEntity } from './modules/invoices/infrastructure/entities/invoice.entity';
import { PassengersModule } from './modules/passengers/passengers.module';
import { DriversModule } from './modules/drivers/drivers.module';
import { TripsModule } from './modules/trips/trips.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { DriverEntity } from './modules/drivers/infrastructure/entities/driver.entity';



@Module({
  imports: [PassengersModule ,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // Debugging completo
        console.log('Full Database Config:', {
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD, // No mostrar en producción
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
          entities: [DriverEntity, TripEntity, PassengerEntity, InvoiceEntity],
          synchronize: process.env.NODE_ENV !== 'production',
          logging: true,
          ssl: false,
          retryAttempts: 3,
          retryDelay: 3000,
        };
      },
      inject: [ConfigService],
    }),
    DriversModule,
    TripsModule,
    InvoicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}