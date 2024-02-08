var express = require('express');
var router = express.Router();
const employeeController = require('../controllers/employeeController');

/* Create employee endpoint */
router.post('', employeeController.createEmployee);
/* Create employee endpoint */

/* Get employee by ID endpoint */
router.get('/:id', employeeController.getEmployeeById);
/* Get employee by ID endpoint */

/* Get all employees endpoint */
router.get('', employeeController.getAllEmployees);
/* Get all employees endpoint */

/* Update employee by ID endpoint */
router.put('/:id', employeeController.updateEmployeeById);
/* Update employee by ID endpoint */

/* Delete employee by ID endpoint */
router.delete('/:id', employeeController.deleteEmployeeById);
/* Delete employee by ID endpoint */


module.exports = router;
