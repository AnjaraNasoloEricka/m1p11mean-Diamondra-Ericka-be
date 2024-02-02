const mongoose = require('mongoose');

const serviceTypeSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ServiceType', serviceTypeSchema);;
