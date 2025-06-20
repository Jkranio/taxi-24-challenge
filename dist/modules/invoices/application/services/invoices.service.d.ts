import { IInvoiceRepository } from '../../domain/repositories/invoice.repository.interface';
import { Invoice } from '../../domain/models/invoice.model';
import { UpdateInvoiceDto } from '../../presentation/dto/update-invoice.dto';
import { CreateInvoiceDto } from '../../presentation/dto/create-invoice.dto';
import { TripsService } from 'src/modules/trips/application/services/trips.service';
export declare class InvoicesService {
    private readonly repo;
    private readonly tripsService;
    constructor(repo: IInvoiceRepository, tripsService: TripsService);
    create(dto: CreateInvoiceDto): Promise<Invoice>;
    findAll(): Promise<Invoice[]>;
    findOne(id: string): Promise<Invoice>;
    update(id: string, dto: UpdateInvoiceDto): Promise<Invoice>;
    remove(id: string): Promise<void>;
}
