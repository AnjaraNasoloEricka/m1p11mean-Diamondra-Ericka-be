const mongoose = require('mongoose');
const { Payment } = require('./Payment');
const { Service } = require('./Service');
const { SpecialOffer } = require('./SpecialOffer');
const { Customer } = require('./Customer');
const { Employee } = require('./Employee');

const appointmentSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    client: {
        type: Customer.schema,
        ref: 'Customer',
        required: true
    },
    employee: {
        type: Employee.schema,
        ref: 'Employee',
        required: true
    },
    services: {
        type: [Service.schema],
        ref: 'Service'
    },
    specialOffer: {
        type: SpecialOffer.schema,
        ref: 'SpecialOffer'
    },
    startDateTime: {
        type: Date,
        required: true
    },
    endDateTime: {
        type: Date,
        default: function() {
            let seconds = 0;
            if (this.services) {
                this.services.forEach(service => {
                    seconds += service.duration;
                });
            }
            if (this.specialOffer) {
                this.specialOffer.services.forEach(service => {
                    seconds += service.duration;
                });
            }
            return new Date(this.startDateTime.getTime() + seconds * 1000);
        }
    },
    payments: {
        type: [Payment.schema],
        ref: 'Payment'
    },
    totalPrice: {
        type: Number,
        required: true,
        default: function() {
            let price = 0;
            if (this.services) {
                this.services.forEach(service => {
                    price += service.price;
                });
            }
            if (this.specialOffer) {
                this.specialOffer.services.forEach(service => {
                    price += service.price;
                });
                if (this.specialOffer.reductionType === 'percentage') {
                    price -= price * this.specialOffer.reductionValue / 100;
                }
                else {
                    price -= this.specialOffer.reductionValue;
                }
            }
            return price;
        }
    },
    leftToPay: {
        type: Number,
        default: function() {
            let deposit = 0;
            if (this.payments) {
                this.payments.forEach(payment => {
                    deposit += payment.amount;
                });
            }
            return this.totalPrice - deposit;
        }
    },
    status: {
        type: String,
        required: true,
        enum : ['toCome', 'inProgress', 'done', 'cancelled'],
        default: 'toCome'
    }
},{
    collection : 'appointment'
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = { Appointment };
