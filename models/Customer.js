const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    },
    {
        collection : 'customer'
    });

const Customer = mongoose.model('Customer', clientSchema);
module.exports = { Customer };