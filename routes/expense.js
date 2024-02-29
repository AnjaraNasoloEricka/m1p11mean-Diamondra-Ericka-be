var express = require('express');
var router = express.Router();

const expenseController = require('../controllers/expenseController');

/* Insert expense endpoint */
router.post('', expenseController.saveExpense);
/* Insert expense endpoint */

/* Get all expenses endpoint */
router.get('', expenseController.getAllExpense);
/* Get all expenses endpoint */

/* Get all expense types endpoint */
router.get('/types', expenseController.getAllExpenseType);
/* Get all expense types endpoint */

module.exports = router;