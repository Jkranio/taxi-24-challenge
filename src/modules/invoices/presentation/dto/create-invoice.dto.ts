
import { IsEnum, IsNumber, IsUUID, Length } from 'class-validator';
import { PaymentMethod } from '../../infrastructure/entities/invoice.entity';

export class CreateInvoiceDto {
  @IsUUID()
  tripId: string;

  @IsNumber()
  subtotal: number;

  @IsNumber()
  tax: number;

  @IsNumber()
  total: number;

  @Length(3, 3)
  currency: string;

  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;
}
