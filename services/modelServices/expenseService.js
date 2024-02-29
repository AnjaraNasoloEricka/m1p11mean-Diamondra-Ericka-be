const ajvValidateExpense = require('../ajv/ajvValidateExpense');
const ajvServices = require('../ajv/ajvServices');
const { Expense } = require('../../models/Expense');
const { ExpenseType } = require('../../models/ExpenseType');
const responseHandler = require('../handler/responseHandler');

const expenseService = {
    createExpense: async function(expense) {
        try{
            const schema = ajvValidateExpense.getSchemaExpense();
            ajvServices.validateSchema(schema, expense);
            // logic to create expense
            let newExpense = new Expense(expense);
            await newExpense.save();
            // logic to create expense
            return new responseHandler(200, 'Expense saved successfully', newExpense);
        }
        catch(error){
            throw new responseHandler((error.status) ?  error.status : 400, error.message);
        }
        
    },

    getAllExpenseType: async function(){
        try{
            const expenseTypes = await ExpenseType.find();
            return new responseHandler(200, 'Expense types found', expenseTypes);
        }
        catch(error){
            console.log(error);
            throw new responseHandler((error.status) ?  error.status : 400, error.message);
        }

    },

    getAllExpense: async function() {
        try{
            const expenses = await Expense.find({ status : 1});
            return new responseHandler(200, 'Expenses found', expenses);
        }
        catch(error){
            throw new responseHandler((error.status) ?  error.status : 400, error.message);
        }
    },

    getExpensePerMonth : async function(year) {
        try{
            const totalAmounts = await Expense.aggregate([
                {
                    $match: {
                        date: {
                            $gte: new Date(year, 0, 1),
                            $lt: new Date(year + 1, 0, 1)
                        }
                    }
                },
                {
                    $group: {
                        _id: { $month: "$date" },
                        totalAmount: {
                            $sum: "$amount"
                        },
                    }
                },
                {
                    $project: {
                        _id: 0,
                        month: "$_id",
                        totalAmount: 1
                    }
                }
            ]);
            return new responseHandler(200, 'Expenses found', totalAmounts);
        }
        catch(error){
            throw new responseHandler((error.status) ?  error.status : 400, error.message);
        }
    }
};

module.exports = expenseService;
    
