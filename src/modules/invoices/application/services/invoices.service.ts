import { Injectable, Inject, NotFoundException, ConflictException } from '@nestjs/common';
import { IInvoiceRepository } from '../../domain/repositories/invoice.repository.interface';
import { Invoice } from '../../domain/models/invoice.model';
import { UpdateInvoiceDto } from '../../presentation/dto/update-invoice.dto';
import { CreateInvoiceDto } from '../../presentation/dto/create-invoice.dto';
import { TripsService } from 'src/modules/trips/application/services/trips.service';

@Injectable()
export class InvoicesService {
    constructor(
        @Inject(IInvoiceRepository)
        private readonly repo: IInvoiceRepository,
        private readonly tripsService: TripsService,
    ) { }

    async create(dto: CreateInvoiceDto): Promise<Invoice> {
        const existingInvoice = await this.repo.findById(dto.tripId);
        if (existingInvoice) {
            throw new ConflictException('Invoice already exists for this trip');
        }
        const trip = await this.tripsService.findOne(dto.tripId);

        const invoice = new Invoice({
            tripId: dto.tripId,
            subtotal: dto.subtotal,
            tax: dto.tax,
            total: dto.total,
            paymentMethod: dto.paymentMethod,
            issuedAt: new Date(),
            trip: trip,
        });
        return this.repo.create(invoice);
    }

    async findAll(): Promise<Invoice[]> {
        return this.repo.findAll();
    }

    async findOne(id: string): Promise<Invoice> {
        const p = await this.repo.findById(id);
        if (!p) throw new NotFoundException(`Invoice ${id} no encontrado`);
        return p;
    }

    async update(id: string, dto: UpdateInvoiceDto): Promise<Invoice> {
        const existing = await this.findOne(id);
        return this.repo.update(existing);
    }

    async remove(id: string): Promise<void> {
        await this.findOne(id);
        await this.repo.delete(id);
    }
}
