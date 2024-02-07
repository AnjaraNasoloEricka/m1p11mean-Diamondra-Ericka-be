var express = require('express');
var router = express.Router();

const serviceController = require('../controllers/serviceController');

/* Create service endpoint */
router.post('', serviceController.createService);
/* Create service endpoint */

/* Get service by ID endpoint */
router.get('/:id', serviceController.getServiceById);
/* Get service by ID endpoint */

/* Get all services endpoint */
router.get('', serviceController.getAllServices);
/* Get all services endpoint */

/* Update service by ID endpoint */
router.put('/:id', serviceController.updateServiceById);
/* Update service by ID endpoint */

/* Delete service by ID endpoint */
router.delete('/:id', serviceController.deleteServiceById);
/* Delete service by ID endpoint */



module.exports = router;