const mongoose = require('mongoose');

const specialOfferSchema = new mongoose.Schema({
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    services: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Service',
        required: true
    },
    reductionType: {
        type: String,
        required: true
    },
    reductionValue: {
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
    
module.exports =  mongoose.model('SpecialOffer', specialOfferSchema);

