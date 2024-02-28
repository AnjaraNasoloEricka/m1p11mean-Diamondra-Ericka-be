var express = require('express');
var router = express.Router();

const customerController = require('../controllers/customerController');

router.get('/services/most-used', customerController.getCustomerMostUsedServices);

router.get('/appointments/:id', customerController.getCustomerAppointments);

module.exports = router;