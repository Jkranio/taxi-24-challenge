import { TripEntity } from "../../../trips/infrastructure/entities/trip.entity";
export declare enum PaymentMethod {
    CASH = "CASH",
    CREDIT_CARD = "CREDIT_CARD",
    DEBIT_CARD = "DEBIT_CARD",
    TRANSFER = "TRANSFER"
}
export declare class InvoiceEntity {
    id: string;
    tripId: string;
    trip: TripEntity;
    subtotal: number;
    tax: number;
    total: number;
    currency: string;
    paymentMethod: PaymentMethod;
    issuedAt: Date;
}
