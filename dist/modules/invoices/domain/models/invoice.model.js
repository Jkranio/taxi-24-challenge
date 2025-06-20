"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invoice = void 0;
class Invoice {
    id;
    tripId;
    subtotal;
    tax;
    total;
    paymentMethod;
    issuedAt;
    trip;
    constructor(props) {
        this.id = props.id;
        this.tripId = props.tripId;
        this.subtotal = props.subtotal;
        this.tax = props.tax;
        this.total = props.total;
        this.paymentMethod = props.paymentMethod;
        this.issuedAt = props.issuedAt;
        this.trip = props.trip;
    }
    getId() {
        if (!this.id) {
            throw new Error("ID is not defined");
        }
        return this.id;
    }
    getTripId() {
        return this.tripId;
    }
    getSubtotal() {
        return this.subtotal;
    }
    getTax() {
        return this.tax;
    }
    getTotal() {
        return this.total;
    }
    getPaymentMethod() {
        return this.paymentMethod;
    }
    getIssuedAt() {
        return this.issuedAt;
    }
    getTrip() {
        if (!this.trip) {
            throw new Error("Trip is not defined");
        }
        return this.trip;
    }
    setTripId(tripId) {
        this.tripId = tripId;
    }
    setSubtotal(subtotal) {
        this.subtotal = subtotal;
    }
    setTax(tax) {
        this.tax = tax;
    }
}
exports.Invoice = Invoice;
//# sourceMappingURL=invoice.model.js.map