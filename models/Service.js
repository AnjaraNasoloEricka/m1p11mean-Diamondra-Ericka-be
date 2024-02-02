const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    serviceType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceType',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    commissionRate: {
        type: Number,
        required: true
    },
    commissionValue: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Service', serviceSchema);
