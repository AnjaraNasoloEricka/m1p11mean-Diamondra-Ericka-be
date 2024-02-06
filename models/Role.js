const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    label: {
        type: String,
        required: true,
    }
    },
    {
        collection : 'role'
    }
);

const Role = mongoose.model('Role', roleSchema);

module.exports = { Role };
