const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            auto: true,
        },
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
            required: true,
            enum : ['cash', 'online'],
            default : 'online'
        }
    },
    {
        collection : 'payement'
    }
);

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = { Payment };
