const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Role', roleSchema);