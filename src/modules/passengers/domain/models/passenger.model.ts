import { Trip } from 'src/modules/trips/domain/models/trip.model';
import { v4 as uuidv4 } from 'uuid';

export class Passenger {
  readonly id: string;
  fullName: string;
  phone: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  trips: Trip[] = [];

  constructor(props: {
    id?: string;
    fullName: string;
    phone: string;
    email?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    trips?: Trip[];
  }) {
    this.id = props.id ?? uuidv4();
    this.fullName = props.fullName;
    this.phone = props.phone;
    this.email = props.email;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
    this.deletedAt = props.deletedAt;
    this.trips = props.trips || [];
  }

  public getId(): string {
    return this.id;
  }
  updateDetails(fullName: string, phone: string, email?: string) {
    this.fullName = fullName;
    this.phone = phone;
    this.email = email;
    this.updatedAt = new Date();
  }

  markDeleted() {
    this.deletedAt = new Date();
  }
}
