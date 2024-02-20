const specialOfferService = require('../services/specialOfferService');

const specialOfferController = {
    createSpecialOffer: async(req, res) => {
        try {
            const response = await specialOfferService.createSpecialOffer(req.body);
            return res.status(response.status).json(response);
        }
        catch(err){
            return res.status(err.status).json(err);
        }
    },

    getSpecialOfferById: async (req, res) => {
        try{
            const response = await specialOfferService.getSpecialOfferById(req.params.id);
            return res.status(response.status).json(response);
        }
        catch(err){
            return res.status(err.status).json(err);
        }
    },

    getAllSpecialOffers: async (req, res) => {
        try{
            const response = await specialOfferService.getAllSpecialOffers();
            return res.status(response.status).json(response);
        }
        catch(err){
            return res.status(err.status).json(err);
        }
    },

    updateSpecialOfferById: async (req, res) => {
        try{
            const response = await specialOfferService.updateSpecialOfferById(req.params.id, req.body);
            return res.status(response.status).json(response);
        }
        catch(err){
            return res.status(err.status).json(err);
        }
    },

    deleteSpecialOfferById: async (req, res) => {
        try{
            const response = await specialOfferService.deleteSpecialOffer(req.params.id);
            return res.status(response.status).json(response);
        }
        catch(err){
            return res.status(err.status).json(err);
        }
    },

    getSpecialOfferByDate: async (req, res) => {
        try{
            const response = await specialOfferService.getSpecialOffersByDate(req.params.date);
            return res.status(response.status).json(response);
        }
        catch(err){
            return res.status(err.status).json(err);
        }
    },
};

module.exports = specialOfferController;