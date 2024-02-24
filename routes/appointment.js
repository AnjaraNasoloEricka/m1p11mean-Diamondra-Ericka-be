var express = require('express');
var router = express.Router();

const appointmentController = require('../controllers/appointmentController');

router.get('/', appointmentController.getAllAppointmentsByEmployee);

router.get('/customer', appointmentController.getAllAppointmentsByCustomer);

router.post('/', appointmentController.createAppointment);

router.get('/reminder', appointmentController.remindAppointment);

module.exports = router;