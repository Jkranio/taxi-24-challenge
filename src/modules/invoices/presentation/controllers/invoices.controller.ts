import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { InvoicesService } from '../../application/services/invoices.service';
import { Invoice } from '../../domain/models/invoice.model';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { UpdateInvoiceDto } from '../dto/update-invoice.dto';


@Controller('invoices')
export class InvoicesController {
    constructor(private readonly svc: InvoicesService) { }

    @Get()
    findAll(): Promise<Invoice[]> {
        return this.svc.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Invoice> {
        return this.svc.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CreateInvoiceDto): Promise<Invoice> {
        return this.svc.create(dto);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() dto: UpdateInvoiceDto,
    ): Promise<Invoice> {
        return this.svc.update(id, dto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string): Promise<void> {
        return this.svc.remove(id);
    }
}
