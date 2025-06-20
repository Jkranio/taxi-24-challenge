import { Trip } from "src/modules/trips/domain/models/trip.model";

export type PaymentMethod = 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'TRANSFER';

export class Invoice {
    private readonly id?: string;
    private tripId?: string;
    private subtotal: number;
    private tax: number;
    private total: number;
    private paymentMethod: PaymentMethod;
    private issuedAt: Date;
    private trip?: Trip | null;

    constructor(props: {
        id?: string;
        tripId?: string;
        subtotal: number;
        tax: number;
        total: number;
        paymentMethod: PaymentMethod;
        issuedAt: Date;
        trip: Trip;
    }) {
        this.id = props.id;
        this.tripId = props.tripId;
        this.subtotal = props.subtotal;
        this.tax = props.tax;
        this.total = props.total;
        this.paymentMethod = props.paymentMethod;
        this.issuedAt = props.issuedAt;
        this.trip = props.trip;
    }

    public getId(): string {
        if (!this.id) {
            throw new Error("ID is not defined");
        }
        return this.id;
    }

    public getTripId(): string | undefined {
        return this.tripId;
    }

    public getSubtotal(): number {
        return this.subtotal;
    }
    public getTax(): number {
        return this.tax;
    }
    public getTotal(): number {
        return this.total;
    }
    public getPaymentMethod(): PaymentMethod {
        return this.paymentMethod;
    }
    public getIssuedAt(): Date {
        return this.issuedAt;
    }
    
    public getTrip(): Trip {
        if (!this.trip) {
            throw new Error("Trip is not defined");
        }
        return this.trip;
    }
    public setTripId(tripId: string): void {
        this.tripId = tripId;
    }
    public setSubtotal(subtotal: number): void {
        this.subtotal = subtotal;
    }
    public setTax(tax: number): void {
        this.tax = tax;
    }                   
}