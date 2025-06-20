import { Trip } from "src/modules/trips/domain/models/trip.model";
export type PaymentMethod = 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'TRANSFER';
export declare class Invoice {
    private readonly id?;
    private tripId?;
    private subtotal;
    private tax;
    private total;
    private paymentMethod;
    private issuedAt;
    private trip?;
    constructor(props: {
        id?: string;
        tripId?: string;
        subtotal: number;
        tax: number;
        total: number;
        paymentMethod: PaymentMethod;
        issuedAt: Date;
        trip: Trip;
    });
    getId(): string;
    getTripId(): string | undefined;
    getSubtotal(): number;
    getTax(): number;
    getTotal(): number;
    getPaymentMethod(): PaymentMethod;
    getIssuedAt(): Date;
    getTrip(): Trip;
    setTripId(tripId: string): void;
    setSubtotal(subtotal: number): void;
    setTax(tax: number): void;
}
