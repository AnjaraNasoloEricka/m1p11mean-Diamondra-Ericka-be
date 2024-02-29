var express = require('express');
var router = express.Router();

var statController = require('../controllers/statController');

router.get('/ca/day/:date', statController.getCAperDay);

router.get('/ca/month/:year', statController.getCAperMonth);


module.exports = router;