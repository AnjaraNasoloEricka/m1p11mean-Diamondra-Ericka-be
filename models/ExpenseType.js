const mongoose = require('mongoose');

const expenseTypeSchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ExpenseType', expenseTypeSchema);
