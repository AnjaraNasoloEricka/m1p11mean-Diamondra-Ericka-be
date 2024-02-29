const mongoose = require('mongoose');
const { ExpenseType } = require('./ExpenseType');

const expenseSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    expenseType: {
        type: ExpenseType.schema,
        ref: 'ExpenseType',
        required: true,
    },
    status : {
        type: Number,
        default: 1,
        enum : [0, 1]
    }
},
{
    collection : 'expense'
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = { Expense };
