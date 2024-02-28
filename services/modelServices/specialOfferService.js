const ajvServices = require('../ajv/ajvServices');
const ajvValidateSpecialOffer = require('../ajv/ajvValidateSpecialOffer');
const { SpecialOffer } = require('../../models/SpecialOffer');
const responseHandler = require('../handler/responseHandler');
const utilities = require('../utilities');
const { Customer } = require('../../models/Customer');

module.exports = (socket) => {

    return {
        // Create a new special offer
        createSpecialOffer: async function(specialOfferData) {
            try{
                const schema = ajvValidateSpecialOffer.getSchemaSpecialOffer();
                const notificationService = require('./notificationService')(socket);

                ajvServices.validateSchema(schema, specialOfferData);

                let specialOffer = new SpecialOffer(specialOfferData);
                await specialOffer.save().then(async (resp) => {
                    const customers = await Customer.find();
                    utilities.setSpecialOfferEmail(resp, customers);
                    notificationService.sendNotification(resp);
                });

                return new responseHandler(200, 'Special offer saved successfully', specialOffer);
            }
            catch(error){
                throw new responseHandler((error.status ? error.status : 400), error.message);
            }
        },

        // Read a special offer by ID
        getSpecialOfferById: async function(specialOfferId) {
            if(!specialOfferId || specialOfferId === 0){
                throw new responseHandler(400, 'The special offer ID is invalid');
            }
            try{
                const specialOffer = await SpecialOffer.findOne({ _id : specialOfferId});
                if(!specialOffer) throw new responseHandler(404, 'Special offer not found');
                return new responseHandler(200, 'Special offer found', specialOffer);
            }
            catch(error){
                throw new responseHandler((error.status) ?  error.status : 400, error.message);
            }
        },

        // Read all special offers
        getAllSpecialOffers: async function() {
            try{
                const specialOffers = await SpecialOffer.find({
                    status : 1
                }).populate('services');
                return new responseHandler(200, 'Special offers found', specialOffers);
            }
            catch(error){
                throw new responseHandler(400, error.message);
            }
        },

        // Update a special offer by ID
        updateSpecialOfferById: async function(specialOfferId, updatedSpecialOfferData) {
            try{
                const schema = ajvValidateSpecialOffer.getSchemaSpecialOffer();
                ajvServices.validateSchema(schema, updatedSpecialOfferData);

                const specialOffer = await SpecialOffer.findOne({ _id : specialOfferId});
                if(!specialOffer) throw new responseHandler(404, 'Special offer not found');

                specialOffer.set(updatedSpecialOfferData);
                await specialOffer.save();

                return new responseHandler(200, 'Special offer updated successfully', specialOffer);
            }
            catch(error){
                throw new responseHandler((error.status) ?  error.status : 400, error.message);
            }
        },

        // Delete a special offer by ID
        deleteSpecialOfferById: async function(specialOfferId) {
            if(!specialOfferId || specialOfferId === 0){
                throw new responseHandler(400, 'The special offer ID is invalid');
            }
            try{
                const specialOffer = await SpecialOffer.findOneAndUpdate({ _id : specialOfferId}, {status : 0}, { new : true });
                if(!specialOffer) throw new responseHandler(404, 'Special offer not found');
                return new responseHandler(200, 'Special offer deleted successfully', specialOffer);
            }
            catch(error){
                throw new responseHandler((error.status) ?  error.status : 400, error.message);
            }
        },

        // Get all active special offers by date
        getAllActiveSpecialOffersByDate: async function(date) {
            try{
                const specialOffers = await SpecialOffer.find({status : 1, startDate: {$lte: date}, endDate: {$gte: date}});
                return new responseHandler(200, 'Special offers found', specialOffers).populate('services');
            }
            catch(error){
                throw new responseHandler(400, error.message);
            }
        }
    }
}