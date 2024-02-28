var express = require('express');
var router = express.Router();

var taskController = require('../controllers/taskController');

router.get('/:id/:date', taskController.getEmployeeTasksByDate);

module.exports = router;