import { PaymentMethod } from '../../domain/models/invoice.model';
export declare class UpdateInvoiceDto {
    subtotal?: number;
    tax?: number;
    total?: number;
    paymentMethod?: PaymentMethod;
}
