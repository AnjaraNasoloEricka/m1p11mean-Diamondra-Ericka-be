var express = require('express');
var router = express.Router();

const scheduleController = require('../controllers/scheduleController');

/* Get current schedule endpoint */
router.get('/current', scheduleController.getCurrentSchedule);
/* Get current schedule endpoint */

/* Get all schedules endpoint */
router.get('', scheduleController.getAllSchedule);
/* Get all schedules endpoint */

module.exports = router;