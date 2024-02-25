var express = require('express');
var router = express.Router();

const appointmentController = require('../controllers/appointmentController');
const payementController = require("../controllers/paymentController");

router.get('/', appointmentController.getAllAppointmentsByEmployee);

router.get('/:id', appointmentController.getAppointmentById);

router.post('/', appointmentController.createAppointment);

router.get('/remind', appointmentController.remindAppointment);

router.post('/:appointmentId/payments', payementController.savePayment);

module.exports = router;