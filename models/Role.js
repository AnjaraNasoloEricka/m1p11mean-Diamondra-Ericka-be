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
});

module.exports = mongoose.model('Role', roleSchema);