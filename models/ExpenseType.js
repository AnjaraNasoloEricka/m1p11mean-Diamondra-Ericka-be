const mongoose = require('mongoose');

const expenseTypeSchema = new mongoose.Schema({
    __id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    label: {
        type: String,
        required: true
    }
},
{
    collection : 'expenseType'
});

const ExpenseType = mongoose.model('ExpenseType', expenseTypeSchema);
module.exports = { ExpenseType };
