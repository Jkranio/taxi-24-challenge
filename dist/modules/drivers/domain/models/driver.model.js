"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Driver = void 0;
const uuid_1 = require("uuid");
class Driver {
    id;
    fullName;
    phone;
    email;
    vehiclePlate;
    vehicleModel;
    driverLicense;
    status;
    latitude;
    longitude;
    rating;
    createdAt;
    updatedAt;
    deletedAt;
    trips = [];
    constructor(props) {
        this.id = props.id || (0, uuid_1.v4)();
        this.fullName = props.fullName;
        this.phone = props.phone;
        this.email = props.email;
        this.vehiclePlate = props.vehiclePlate;
        this.vehicleModel = props.vehicleModel;
        this.driverLicense = props.driverLicense;
        this.status = props.status ?? 'AVAILABLE';
        this.latitude = props.latitude ?? 0;
        this.longitude = props.longitude ?? 0;
        this.rating = props.rating || 5.0;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deletedAt = props.deletedAt;
        this.trips = props.trips || [];
    }
    changeStatus(newStatus) {
        this.status = newStatus;
        this.updatedAt = new Date();
    }
    updateRating(rating) {
        if (rating < 0 || rating > 5) {
            throw new Error('Rating must be between 0 and 5');
        }
        this.rating = rating;
        this.updatedAt = new Date();
    }
    assignTrip(trip) {
        if (!this.canTakeTrip()) {
            throw new Error('Driver is not available for trips');
        }
        this.trips.push(trip);
        this.changeStatus('ON_TRIP');
    }
    getCurrentTrip() {
        return this.trips.find(trip => trip.getStatus() === 'REQUESTED' ||
            trip.getStatus() === 'ONGOING');
    }
    getPhone() {
        return this.phone;
    }
    getEmail() {
        return this.email;
    }
    getVehiclePlate() {
        return this.vehiclePlate;
    }
    getVehicleModel() {
        return this.vehicleModel;
    }
    getDriverLicense() {
        return this.driverLicense;
    }
    getStatus() {
        return this.status;
    }
    getLatitude() {
        return this.latitude;
    }
    getLongitude() {
        return this.longitude;
    }
    getRating() {
        return this.rating;
    }
    getCreatedAt() {
        return this.createdAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    getDeletedAt() {
        return this.deletedAt;
    }
    getTrips() {
        return [...this.trips];
    }
    getCurrentLocation() {
        return {
            latitude: this.latitude,
            longitude: this.longitude
        };
    }
    toJSON() {
        return {
            id: this.id,
            fullName: this.fullName,
            phone: this.phone,
            email: this.email,
            vehiclePlate: this.vehiclePlate,
            vehicleModel: this.vehicleModel,
            driverLicense: this.driverLicense,
            status: this.status,
            latitude: this.latitude,
            longitude: this.longitude,
            rating: this.rating,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
            trips: this.trips.map(trip => trip.toJSON()),
        };
    }
    getId() {
        return this.id;
    }
    getFullName() {
        return this.fullName;
    }
    isAvailable() {
        return this.status === 'AVAILABLE';
    }
    canTakeTrip() {
        return this.status === 'AVAILABLE' && !this.isDeleted();
    }
    isDeleted() {
        return Boolean(this.deletedAt);
    }
    updateDetails(fullName, phone, email) {
        if (!fullName?.trim()) {
            throw new Error('Full name cannot be empty');
        }
        if (!phone?.trim()) {
            throw new Error('Phone cannot be empty');
        }
        if (phone.length < 8) {
            throw new Error('Phone number must be at least 8 characters long');
        }
        if (email && !email.includes('@')) {
            throw new Error('Invalid email format');
        }
        this.fullName = fullName;
        this.phone = phone;
        this.email = email;
        this.updatedAt = new Date();
    }
}
exports.Driver = Driver;
//# sourceMappingURL=driver.model.js.map