import { InvoicesService } from '../../application/services/invoices.service';
import { Invoice } from '../../domain/models/invoice.model';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { UpdateInvoiceDto } from '../dto/update-invoice.dto';
export declare class InvoicesController {
    private readonly svc;
    constructor(svc: InvoicesService);
    findAll(): Promise<Invoice[]>;
    findOne(id: string): Promise<Invoice>;
    create(dto: CreateInvoiceDto): Promise<Invoice>;
    update(id: string, dto: UpdateInvoiceDto): Promise<Invoice>;
    remove(id: string): Promise<void>;
}
