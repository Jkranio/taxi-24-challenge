export class InvoiceResponseDto {
    id: string;
    tripId: string;
    subtotal: number;
    tax: number;
    total: number;
    paymentMethod: string;
    issuedAt: Date;
}