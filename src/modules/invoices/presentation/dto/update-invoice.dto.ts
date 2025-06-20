import { IsDecimal, IsEnum, IsOptional } from 'class-validator';
import { PaymentMethod } from '../../domain/models/invoice.model';

export class UpdateInvoiceDto {
    @IsOptional()
    @IsDecimal()
    subtotal?: number;

    @IsOptional()
    @IsDecimal()
    tax?: number;

    @IsOptional()
    @IsDecimal()
    total?: number;

    @IsOptional()
    @IsEnum(['CASH', 'CREDIT_CARD', 'DEBIT_CARD', 'TRANSFER'])
    paymentMethod?: PaymentMethod;
}