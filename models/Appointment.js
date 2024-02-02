const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    services: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Service'
    },
    specialOffer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SpecialOffer'
    },
    startDateTime: {
        type: Date,
        required: true
    },
    endDateTime: {
        type: Date,
        required: true
    },
    payments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Payment'
    },
    totalPrice: {
        type: Number,
        required: true
    },
    deposit: {
        type: Number,
    },
    leftToPay: {
        type: Number,
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
