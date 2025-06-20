"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trip = void 0;
const uuid_1 = require("uuid");
class Trip {
    id;
    driverId;
    passengerId;
    originLat;
    originLong;
    destLat;
    destLong;
    distanceKm;
    durationSec;
    fare;
    currency;
    status;
    requestedAt;
    startedAt;
    finishedAt;
    updatedAt;
    driver;
    passenger;
    invoiceId;
    constructor(props) {
        this.id = props.id || (0, uuid_1.v4)();
        this.driverId = props.driverId;
        this.passengerId = props.passengerId;
        this.originLat = props.originLat;
        this.originLong = props.originLong;
        this.destLat = props.destLat;
        this.destLong = props.destLong;
        this.distanceKm = props.distanceKm;
        this.durationSec = props.durationSec;
        this.fare = props.fare;
        this.currency = props.currency || 'USD';
        this.status = props.status || 'REQUESTED';
        this.requestedAt = props.requestedAt || new Date();
        this.startedAt = props.startedAt;
        this.finishedAt = props.finishedAt;
        this.updatedAt = new Date();
        this.driver = props.driver;
        this.passenger = props.passenger;
        this.invoiceId = props.invoiceId;
    }
    assignDriver(driverId) {
        if (this.status !== 'REQUESTED') {
            throw new Error('Trip cannot be assigned');
        }
        this.driverId = driverId;
        this.status = 'ONGOING';
        this.updatedAt = new Date();
    }
    getDriverDetails() {
        return this.driver;
    }
    getPassengerDetails() {
        return this.passenger;
    }
    start() {
        if (this.status !== 'ONGOING') {
            throw new Error('Trip cannot be started');
        }
        this.status = 'ONGOING';
        this.startedAt = new Date();
        this.updatedAt = new Date();
    }
    complete() {
        if (this.status !== 'ONGOING' && this.status !== 'REQUESTED') {
            throw new Error('Trip cannot be completed');
        }
        this.status = 'FINISHED';
        this.finishedAt = new Date();
        this.updatedAt = new Date();
    }
    cancel() {
        if (['COMPLETED', 'CANCELLED'].includes(this.status)) {
            throw new Error('Trip cannot be cancelled');
        }
        this.status = 'CANCELLED';
        this.updatedAt = new Date();
    }
    getId() {
        return this.id;
    }
    getDriverId() {
        return this.driverId;
    }
    getPassengerId() {
        return this.passengerId;
    }
    getOriginLat() {
        return this.originLat;
    }
    getOriginLong() {
        return this.originLong;
    }
    getDestLat() {
        return this.destLat;
    }
    getDestLong() {
        return this.destLong;
    }
    getDistanceKm() {
        return this.distanceKm;
    }
    getDurationSec() {
        return this.durationSec;
    }
    getFare() {
        return this.fare;
    }
    getCurrency() {
        return this.currency;
    }
    getStatus() {
        return this.status;
    }
    getRequestedAt() {
        return this.requestedAt;
    }
    getStartedAt() {
        return this.startedAt;
    }
    getFinishedAt() {
        return this.finishedAt;
    }
    getUpdatedAt() {
        return this.updatedAt;
    }
    getInvoiceId() {
        return this.invoiceId;
    }
    toJSON() {
        return {
            id: this.id,
            driverId: this.driverId,
            passengerId: this.passengerId,
            originLat: this.originLat,
            originLong: this.originLong,
            destLat: this.destLat,
            destLong: this.destLong,
            distanceKm: this.distanceKm,
            durationSec: this.durationSec,
            fare: this.fare,
            currency: this.currency,
            status: this.status,
            requestedAt: this.requestedAt,
            startedAt: this.startedAt,
            finishedAt: this.finishedAt,
            updatedAt: this.updatedAt
        };
    }
}
exports.Trip = Trip;
//# sourceMappingURL=trip.model.js.map