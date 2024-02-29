const mongoose = require('mongoose');

const serviceTypeSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    }
},{
    collection : 'service.type'
});

const ServiceType = mongoose.model('ServiceType', serviceTypeSchema);
module.exports = { ServiceType };
