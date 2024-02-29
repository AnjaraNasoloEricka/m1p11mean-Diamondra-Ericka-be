var express = require('express');
var router = express.Router();

const scheduleController = require('../controllers/scheduleController');

/* Get current schedule endpoint */
router.get('/current', scheduleController.getCurrentSchedule);
/* Get current schedule endpoint */

/* Get all schedules endpoint */
router.get('', scheduleController.getAllSchedule);
/* Get all schedules endpoint */

/* Insert schedule endpoint */
router.post('', scheduleController.insertSchedule);
/* Insert schedule endpoint */

/* Update schedule endpoint */
router.put('/:scheduleId', scheduleController.updateSchedule);
/* Update schedule endpoint */

/* Delete schedule endpoint */
router.delete('/:scheduleId', scheduleController.deleteSchedule);
/* Delete schedule endpoint */

module.exports = router;