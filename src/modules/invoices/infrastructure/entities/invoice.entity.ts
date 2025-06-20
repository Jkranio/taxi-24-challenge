import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TripEntity } from "../../../trips/infrastructure/entities/trip.entity";

export enum PaymentMethod {
  CASH = 'CASH',
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  TRANSFER = 'TRANSFER',
}

@Entity({ name: 'invoices' })
export class InvoiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'trip_id' })
  tripId: string;

  @OneToOne(() => TripEntity)
  @JoinColumn({ name: 'trip_id' })
  trip: TripEntity;

  @Column({ type: 'numeric', precision: 10, scale: 2 }) subtotal: number;
  @Column({ type: 'numeric', precision: 10, scale: 2 }) tax: number;
  @Column({ type: 'numeric', precision: 10, scale: 2 }) total: number;

  @Column({ length: 3, name: 'currency' }) currency: string;
  @Column({
    type: 'enum',
    enum: PaymentMethod,
    name: 'payment_method',
  })
  paymentMethod: PaymentMethod;

  @CreateDateColumn({ name: 'issued_at', type: 'timestamptz' })
  issuedAt: Date;
}