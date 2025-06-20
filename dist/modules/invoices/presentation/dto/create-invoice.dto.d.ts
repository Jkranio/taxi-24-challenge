import { PaymentMethod } from '../../infrastructure/entities/invoice.entity';
export declare class CreateInvoiceDto {
    tripId: string;
    subtotal: number;
    tax: number;
    total: number;
    currency: string;
    paymentMethod: PaymentMethod;
}
