const mongoose = require('mongoose');

const specialOfferSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true,
    },
    services: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Service',
        required: true
    },
    reductionType: {
        type: String,
        required: true,
        enum: ['percentage', 'value']
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
},
{
    collection : 'specialOffer'
}
);

const SpecialOffer = mongoose.model('SpecialOffer', specialOfferSchema);
module.exports = { SpecialOffer };
    
