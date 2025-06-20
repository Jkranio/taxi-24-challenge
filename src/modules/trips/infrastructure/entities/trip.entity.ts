import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { PassengerEntity } from "../../../passengers/infrastructure/entities/passenger.entity";
import { InvoiceEntity } from "../../../invoices/infrastructure/entities/invoice.entity";
import { DriverEntity } from "src/modules/drivers/infrastructure/entities/driver.entity";

export enum TripStatus {
  REQUESTED = 'REQUESTED',
  ONGOING = 'ONGOING',
  FINISHED = 'FINISHED',
  CANCELLED = 'CANCELLED',
  NO_SHOW = 'NO_SHOW',
}

@Entity({ name: 'trips' })
export class TripEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @ManyToOne(() => DriverEntity, (d) => d.trips, { eager: false })
  @JoinColumn({ name: 'driver_id' })
  driver: DriverEntity;

  @Index()
  @ManyToOne(() => PassengerEntity, (p) => p.trips, { eager: false })
  @JoinColumn({ name: 'passenger_id' })
  passenger: PassengerEntity;

  @OneToOne(() => InvoiceEntity, invoice => invoice.trip)
  invoice: InvoiceEntity;


  @Column({ type: 'numeric', name: 'origin_lat' }) originLat: number;
  @Column({ type: 'numeric', name: 'origin_long' }) originLong: number;
  @Column({ type: 'numeric', name: 'dest_lat' }) destLat: number;
  @Column({ type: 'numeric', name: 'dest_long' }) destLong: number;
  @Column({ type: 'decimal', name: 'distanceKm', precision: 10, scale: 2, nullable: true })
  distanceKm: number;
  @Column({ type: 'integer', name: 'duration_sec',nullable: true }) durationSec: number;

  @Column({ type: 'numeric' }) fare: number;
  @Column({ length: 3, name: 'currency' }) currency: string;

  @Column({ type: 'enum', enum: TripStatus, default: TripStatus.REQUESTED })
  status: TripStatus;

  @CreateDateColumn({ name: 'requested_at', type: 'timestamptz' })
  requestedAt: Date;
  @Column({ name: 'started_at', type: 'timestamptz', nullable: true })
  startedAt?: Date;
  @Column({ name: 'finished_at', type: 'timestamptz', nullable: true })
  finishedAt?: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
}