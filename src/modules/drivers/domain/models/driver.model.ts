import { v4 as uuidv4 } from 'uuid';
import { Trip } from 'src/modules/trips/domain/models/trip.model';


export type DriverStatus = 'AVAILABLE' | 'ON_TRIP' | 'OFFLINE';

export class Driver {
    readonly id: string;
    fullName: string;
    phone: string;
    email?: string;
    vehiclePlate: string;
    vehicleModel: string;
    driverLicense: string;
    status: DriverStatus;
    latitude: number;
    longitude: number;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    trips: Trip[] = [];


    constructor(props: {
        id?: string;
        fullName: string;
        phone: string;
        email?: string;
        vehiclePlate: string;
        vehicleModel: string;
        driverLicense: string;
        status?: DriverStatus;
        latitude?: number;
        longitude?: number;
        rating?: number;
        createdAt?: Date;
        updatedAt?: Date;
        deletedAt?: Date;
        trips?: Trip[];
    }) {
        this.id = props.id || uuidv4();
        this.fullName = props.fullName;
        this.phone = props.phone;
        this.email = props.email;
        this.vehiclePlate = props.vehiclePlate;
        this.vehicleModel = props.vehicleModel;
        this.driverLicense = props.driverLicense;
        this.status = props.status ?? 'AVAILABLE';
        this.latitude = props.latitude ?? 0;
        this.longitude = props.longitude ?? 0;
        this.rating = props.rating || 5.0;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deletedAt = props.deletedAt;
        this.trips = props.trips || [];
    }



    changeStatus(newStatus: DriverStatus): void {
        this.status = newStatus;
        this.updatedAt = new Date();
    }

    updateRating(rating: number): void {
        if (rating < 0 || rating > 5) {
            throw new Error('Rating must be between 0 and 5');
        }
        this.rating = rating;
        this.updatedAt = new Date();
    }


    assignTrip(trip: Trip): void {
        if (!this.canTakeTrip()) {
            throw new Error('Driver is not available for trips');
        }
        this.trips.push(trip);
        this.changeStatus('ON_TRIP');
    }

    getCurrentTrip(): Trip | undefined {
        return this.trips.find(trip => 
            trip.getStatus() === 'REQUESTED' || 
            trip.getStatus() === 'ONGOING'
        );
    }




    getPhone(): string {
        return this.phone;
    }

    getEmail(): string | undefined {
        return this.email;
    }

    getVehiclePlate(): string {
        return this.vehiclePlate;
    }

    getVehicleModel(): string {
        return this.vehicleModel;
    }

    getDriverLicense(): string {
        return this.driverLicense;
    }

    getStatus(): DriverStatus {
        return this.status;
    }

    getLatitude(): number {
        return this.latitude;
    }

    getLongitude(): number {
        return this.longitude;
    }

    getRating(): number {
        return this.rating;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    getDeletedAt(): Date | undefined {
        return this.deletedAt;
    }

    getTrips(): Trip[] {
        return [...this.trips];
    }

    getCurrentLocation(): { latitude: number; longitude: number } {
        return {
            latitude: this.latitude,
            longitude: this.longitude
        };
    }

    // Método para el mapper
    toJSON() {
        return {
            id: this.id,
            fullName: this.fullName,
            phone: this.phone,
            email: this.email,
            vehiclePlate: this.vehiclePlate,
            vehicleModel: this.vehicleModel,
            driverLicense: this.driverLicense,
            status: this.status,
            latitude: this.latitude,
            longitude: this.longitude,
            rating: this.rating,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
            trips: this.trips.map(trip => trip.toJSON()),

        };
    }

    // Getters
    getId(): string {
        return this.id;
    }

    getFullName(): string {
        return this.fullName;
    }




    // Métodos de negocio
    isAvailable(): boolean {
        return this.status === 'AVAILABLE';
    }

    canTakeTrip(): boolean {
        return this.status === 'AVAILABLE' && !this.isDeleted();
    }

    private isDeleted(): boolean {
        return Boolean(this.deletedAt);
    }
    updateDetails(fullName: string, phone: string, email?: string): void {
        if (!fullName?.trim()) {
            throw new Error('Full name cannot be empty');
        }
        if (!phone?.trim()) {
            throw new Error('Phone cannot be empty');
        }
        if (phone.length < 8) {
            throw new Error('Phone number must be at least 8 characters long');
        }
        if (email && !email.includes('@')) {
            throw new Error('Invalid email format');
        }

        this.fullName = fullName;
        this.phone = phone;
        this.email = email;
        this.updatedAt = new Date();
    }
}