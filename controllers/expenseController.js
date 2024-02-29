const expenseService = require("../services/modelServices/expenseService");

const expenseController = {
    saveExpense: async (req, res) => {
        try{
            const response = await expenseService.createExpense(req.body);
            return res.status(response.status).json(response);
        }
        catch(error){
            return res.status(error.status).json(error);
        }
    },
    getAllExpense: async (req, res) => {
        try{
            const response = await expenseService.getAllExpense();
            return res.status(response.status).json(response);
        }
        catch(err){
            return res.status(err.status).json(err);
        }
    },
    getAllExpenseType: async (req, res) => {
        try{
            const response = await expenseService.getAllExpenseType();
            return res.status(response.status).json(response);
        }
        catch(err){
            return res.status(err.status).json(err);
        }
    },
    getExpensePerMonth: async (req, res) => {
        try{
           const response = await expenseService.getExpensePerMonth(req.params.year);
              return res.status(response.status).json(response);
        }
        catch(err){
            return res.status(err.status).json(err);
        }
    }
}

module.exports = expenseController;