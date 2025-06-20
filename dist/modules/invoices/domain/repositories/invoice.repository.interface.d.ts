import { Invoice } from "../models/invoice.model";
export declare const IInvoiceRepository = "IInvoiceRepository";
export interface IInvoiceRepository {
    create(invoice: Invoice): Promise<Invoice>;
    findAll(): Promise<Invoice[]>;
    findById(id: string): Promise<Invoice | null>;
    update(invoice: Invoice): Promise<Invoice>;
    delete(id: string): Promise<void>;
}
