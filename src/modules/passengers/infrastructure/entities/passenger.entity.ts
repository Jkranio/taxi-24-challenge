import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TripEntity } from '../../../trips/infrastructure/entities/trip.entity';

@Entity({ name: 'passengers' })
export class PassengerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 120, name: 'full_name' })
  fullName: string;

  @Column({ length: 20, unique: true })
  phone: string;

  @Column({ length: 100, unique: true, nullable: true })
  email: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  deletedAt?: Date;

  @OneToMany(() => TripEntity, (t) => t.passenger, {
    cascade: ['insert', 'update'],
  })
  trips: TripEntity[];
}
