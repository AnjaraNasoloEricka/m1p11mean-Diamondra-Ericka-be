const app = require("../config/firebaseConfig");
const firebaseStorage = require("../services/firebaseStorage");
const serviceService = require("../services/modelServices/serviceService");

const serviceController = {
    createService : async(req, res) => {
        try {
            const response = await serviceService.createService(req.body, req.file);
            return res.status(response.status).json(response);
        }
        catch(err){
            console.log(err);
            return res.status(err.status).json(err);
        }
    },

    // Read a service by ID
    getServiceById: async (req, res) => {
        try{
            const response = await serviceService.getServiceById(req.params.id);
            return res.status(response.status).json(response);
        }
        catch(err){
            return res.status(err.status).json(err);
        }
    },

    // Read all services
    getAllServices: async (req, res) => {
        try{
            const response = await serviceService.getAllActiveServices();
            return res.status(response.status).json(response);
        }
        catch(err){
            return res.status(err.status).json(err);
        }
    },

    // Delete service
    deleteServiceById: async (req, res) => {
        try{
            const response = await serviceService.deleteService(req.params.id);
            return res.status(response.status).json(response);
        }
        catch(err){
            return res.status(err.status).json(err);
        }
    },


    // Update a service by ID
    updateServiceById: async (req, res) => {
        try{
            const response = await serviceService.updateServiceById(req.params.id, req.body, req.file );
            return res.status(response.status).json(response);
        }
        catch(err){
            return res.status(err.status).json(err);
        }
    },

    // Get all service types
    getServiceTypes: async (req, res) => {
        try{
            const response = await serviceService.getAllServiceTypes();
            return res.status(response.status).json(response);
        }
        catch(err){
            return res.status(err.status).json(err);
        }
    }

};

module.exports = serviceController;