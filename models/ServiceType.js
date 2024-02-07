const mongoose = require('mongoose');

const serviceTypeSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    }
},{
    collection : 'service.type'
});

module.exports = mongoose.model('ServiceType', serviceTypeSchema);;
