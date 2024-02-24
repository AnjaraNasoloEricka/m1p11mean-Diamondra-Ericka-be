var express = require('express');
var router = express.Router();

const customerController = require('../controllers/customerController');

router.get('/services/most-used', customerController.getCustomerMostUsedServices);

module.exports = router;