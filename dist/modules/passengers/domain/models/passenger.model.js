"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Passenger = void 0;
const uuid_1 = require("uuid");
class Passenger {
    id;
    fullName;
    phone;
    email;
    createdAt;
    updatedAt;
    deletedAt;
    trips = [];
    constructor(props) {
        this.id = props.id ?? (0, uuid_1.v4)();
        this.fullName = props.fullName;
        this.phone = props.phone;
        this.email = props.email;
        this.createdAt = props.createdAt ?? new Date();
        this.updatedAt = props.updatedAt ?? new Date();
        this.deletedAt = props.deletedAt;
        this.trips = props.trips || [];
    }
    getId() {
        return this.id;
    }
    updateDetails(fullName, phone, email) {
        this.fullName = fullName;
        this.phone = phone;
        this.email = email;
        this.updatedAt = new Date();
    }
    markDeleted() {
        this.deletedAt = new Date();
    }
}
exports.Passenger = Passenger;
//# sourceMappingURL=passenger.model.js.map