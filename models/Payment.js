const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Payment', paymentSchema);
