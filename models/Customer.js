const mongoose = require('mongoose');
const { User } = require('./User');

const clientSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    user : {
        type: User.schema,
        required: true
    },
    },
    {
        collection : 'customer'
    });

const Customer = mongoose.model('Customer', clientSchema);
module.exports = { Customer };