var express = require('express');
var router = express.Router();

const appointmentController = require('../controllers/appointmentController');

router.get('/', appointmentController.getAllAppointmentsByEmployee);

module.exports = router;