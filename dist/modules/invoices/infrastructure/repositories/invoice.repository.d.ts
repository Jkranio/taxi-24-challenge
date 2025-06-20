import { Repository } from 'typeorm';
import { IInvoiceRepository } from '../../domain/repositories/invoice.repository.interface';
import { InvoiceEntity } from '../entities/invoice.entity';
import { Invoice } from '../../domain/models/invoice.model';
import { TripEntity } from 'src/modules/trips/infrastructure/entities/trip.entity';
export declare class InvoiceRepository implements IInvoiceRepository {
    private readonly repo;
    private readonly tripRepo;
    constructor(repo: Repository<InvoiceEntity>, tripRepo: Repository<TripEntity>);
    private toEntity;
    private toDomain;
    create(invoice: Invoice): Promise<Invoice>;
    update(invoice: Invoice): Promise<Invoice>;
    findById(id: string): Promise<Invoice>;
    findAll(): Promise<Invoice[]>;
    delete(id: string): Promise<void>;
}
