import { v4 as uuidv4 } from 'uuid';
import { Driver } from '../../../drivers/domain/models/driver.model';
import { Passenger } from '../../../passengers/domain/models/passenger.model';
import { Invoice } from 'src/modules/invoices/domain/models/invoice.model';

export type TripStatus = 'REQUESTED' | 'ONGOING' | 'FINISHED' | 'CANCELLED' | 'NO_SHOW';

export class Trip {
    private readonly id: string;
    private driverId?: string;
    private passengerId: string;
    private originLat: number;
    private originLong: number;
    private destLat: number;
    private destLong: number;
    private distanceKm?: number;
    private durationSec?: number;
    private fare?: number;
    private currency: string;
    private status: TripStatus;
    private readonly requestedAt: Date;
    private startedAt?: Date;
    private finishedAt?: Date;
    private updatedAt: Date;
    private driver?: Partial<Driver>;
    private passenger?: Partial<Passenger>;
    private invoiceId?: string;

    constructor(props: {
        id?: string;
        driverId?: string;
        passengerId: string;
        originLat: number;
        originLong: number;
        destLat: number;
        destLong: number;
        distanceKm?: number;
        durationSec?: number;
        fare?: number;
        currency?: string;
        status?: TripStatus;
        requestedAt?: Date;
        startedAt?: Date;
        finishedAt?: Date;
        updatedAt?: Date;
        driver?: Partial<Driver>;
        passenger?: Partial<Passenger>;
        invoiceId?: string;
    }) {
        this.id = props.id || uuidv4();
        this.driverId = props.driverId;
        this.passengerId = props.passengerId;
        this.originLat = props.originLat;
        this.originLong = props.originLong;
        this.destLat = props.destLat;
        this.destLong = props.destLong;
        this.distanceKm = props.distanceKm;
        this.durationSec = props.durationSec;
        this.fare = props.fare;
        this.currency = props.currency || 'USD';
        this.status = props.status || 'REQUESTED';
        this.requestedAt = props.requestedAt || new Date();
        this.startedAt = props.startedAt;
        this.finishedAt = props.finishedAt;
        this.updatedAt = new Date();
        this.driver = props.driver;
        this.passenger = props.passenger;
        this.invoiceId = props.invoiceId;
    }

    // Métodos de negocio
    assignDriver(driverId: string): void {
        if (this.status !== 'REQUESTED') {
            throw new Error('Trip cannot be assigned');
        }
        this.driverId = driverId;
        this.status = 'ONGOING';
        this.updatedAt = new Date();
    }
    getDriverDetails(): Partial<Driver> | undefined {
        return this.driver;
    }

    getPassengerDetails(): Partial<Passenger> | undefined {
        return this.passenger;
    }
    start(): void {
        if (this.status !== 'ONGOING') {
            throw new Error('Trip cannot be started');
        }
        this.status = 'ONGOING';
        this.startedAt = new Date();
        this.updatedAt = new Date();
    }

    complete(): void {
        if (this.status !== 'ONGOING' && this.status !== 'REQUESTED') {
            throw new Error('Trip cannot be completed');
        }
        this.status = 'FINISHED';
        this.finishedAt = new Date();
        this.updatedAt = new Date();
    }

    cancel(): void {
        if (['COMPLETED', 'CANCELLED'].includes(this.status)) {
            throw new Error('Trip cannot be cancelled');
        }
        this.status = 'CANCELLED';
        this.updatedAt = new Date();
    }

    // Getters
    getId(): string {
        return this.id;
    }

    getDriverId(): string | undefined {
        return this.driverId;
    }

    getPassengerId(): string {
        return this.passengerId;
    }

    getOriginLat(): number {
        return this.originLat;
    }

    getOriginLong(): number {
        return this.originLong;
    }

    getDestLat(): number {
        return this.destLat;
    }

    getDestLong(): number {
        return this.destLong;
    }

    getDistanceKm(): number | undefined {
        return this.distanceKm;
    }

    getDurationSec(): number | undefined {
        return this.durationSec;
    }

    getFare(): number | undefined {
        return this.fare;
    }

    getCurrency(): string {
        return this.currency;
    }

    getStatus(): TripStatus {
        return this.status;
    }

    getRequestedAt(): Date {
        return this.requestedAt;
    }

    getStartedAt(): Date | undefined {
        return this.startedAt;
    }

    getFinishedAt(): Date | undefined {
        return this.finishedAt;
    }

    getUpdatedAt(): Date {
        return this.updatedAt;
    }

    getInvoiceId(): string | undefined {
        return this.invoiceId;
    }

    // Mapper
    toJSON() {
        return {
            id: this.id,
            driverId: this.driverId,
            passengerId: this.passengerId,
            originLat: this.originLat,
            originLong: this.originLong,
            destLat: this.destLat,
            destLong: this.destLong,
            distanceKm: this.distanceKm,
            durationSec: this.durationSec,
            fare: this.fare,
            currency: this.currency,
            status: this.status,
            requestedAt: this.requestedAt,
            startedAt: this.startedAt,
            finishedAt: this.finishedAt,
            updatedAt: this.updatedAt
            
        };
    }
}