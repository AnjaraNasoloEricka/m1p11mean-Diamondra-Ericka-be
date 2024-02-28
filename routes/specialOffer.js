var express = require('express');
var router = express.Router();

module.exports = (socket) => {
    var specialOfferController = require('../controllers/specialOfferController')(socket);

    /* Create special offer endpoint */
    router.post('', specialOfferController.createSpecialOffer);
    /* Create special offer endpoint */

    /* Get special offer by ID endpoint */
    router.get('/:id', specialOfferController.getSpecialOfferById);
    /* Get special offer by ID endpoint */

    /* Get all special offers endpoint */
    router.get('', specialOfferController.getAllSpecialOffers);
    /* Get all special offers endpoint */

    /* Update special offer by ID endpoint */
    router.put('/:id', specialOfferController.updateSpecialOfferById);
    /* Update special offer by ID endpoint */

    /* Delete special offer by ID endpoint */
    router.delete('/:id', specialOfferController.deleteSpecialOfferById);
    /* Delete special offer by ID endpoint */

    /* Get special offers by date endpoint */
    router.get('/date/:date', specialOfferController.getSpecialOfferByDate);
    /* Get special offers by date endpoint */

    return router;

}



