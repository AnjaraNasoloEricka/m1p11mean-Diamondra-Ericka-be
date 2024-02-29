const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    serviceType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'service.type',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String
    },
    commissionRate: {
        type: Number,
        required: true
    },
    commissionValue: {
        type: Number,
        default: function() {
            return this.price * this.commissionRate / 100;
        }
    },
    status : {
        type: Number,
        default: 1,
        enum: [0, 1],
        required: true
    }
},{
    collection : 'service'
});

const Service = mongoose.model('Service', serviceSchema);
module.exports = { Service };
