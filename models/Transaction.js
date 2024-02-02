const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    income: {
        type: Number,
        validate: {
            validator: function () {
              // If expense is null, income should be required
              return this.expense !== null || (this.expense === null && this.income !== undefined && this.income !== null);
            },
            message: 'Income is required if expense is null.',
        },
    },
    expense: {
        type: Number,
        validate: {
            validator: function () {
              // If income is null, expense should be required
              return this.income !== null || (this.income === null && this.expense !== undefined && this.expense !== null);
            },
            message: 'Income is required if expense is null.',
          },
    },
    left: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);
