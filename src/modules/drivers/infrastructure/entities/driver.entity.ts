import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { TripEntity } from '../../../trips/infrastructure/entities/trip.entity';

export enum DriverStatus {
  AVAILABLE = 'AVAILABLE',
  ON_TRIP = 'ON_TRIP',
  OFFLINE = 'OFFLINE',
}

@Entity({ name: 'drivers' })
export class DriverEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'full_name', length: 120 })
  fullName: string;

  @Index({ unique: true })
  @Column({ length: 20 })
  phone: string;

  @Column({ unique: true, nullable: true,  length: 100 })
  email?: string;

  @Column({ name: 'vehicle_plate', unique: true, length: 50 })
  vehiclePlate: string;

  @Column({ name: 'vehicle_model', length: 100 })
  vehicleModel: string;

  @Column({ name: 'driver_license', unique: true, length: 50 })
  driverLicense: string;

  @Column({ type: 'enum', enum: DriverStatus, default: DriverStatus.OFFLINE })
  status: DriverStatus;

  @Column({ type: 'numeric', nullable: true }) latitude?: number;
  @Column({ type: 'numeric', nullable: true }) longitude?: number;
  @Column({ type: 'numeric', precision: 3, scale: 2, default: 5.0 }) rating: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt?: Date;

 
  @OneToMany(() => TripEntity, (t) => t.driver)
  trips: TripEntity[];
}