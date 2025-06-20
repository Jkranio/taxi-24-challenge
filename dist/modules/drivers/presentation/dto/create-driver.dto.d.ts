import { DriverStatus } from '../../infrastructure/entities/driver.entity';
export declare class CreateDriverDto {
    fullName: string;
    phone: string;
    email?: string;
    vehiclePlate: string;
    vehicleModel: string;
    driverLicense: string;
    status?: DriverStatus;
    latitude?: number;
    longitude?: number;
}
