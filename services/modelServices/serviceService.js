const ajvServices = require('../ajv/ajvServices');
const ajvValidateService = require('../ajv/ajvValidateService');
const { Service } = require('../../models/Service');
const ServiceType = require('../../models/ServiceType');
const responseHandler = require('../handler/responseHandler');
const app = require("../../config/firebaseConfig");
const firebaseStorage = require("../firebaseStorage");

const serviceService = {

    getAllServiceTypes: async function(){
        try{
            const serviceTypes = await ServiceType.find();
            return new responseHandler(200, 'Service types found', serviceTypes);
        }
        catch(err){
           throw new responseHandler(400, err.message);
        }
    },

    // Create a new service
    createService: async function(serviceData, imgFile) {
        try{
            const schema = ajvValidateService.getSchemaService();

            ajvServices.validateSchema(schema, serviceData);

            let service = new Service(serviceData);
           
            if(imgFile){
                service.imageUrl = await firebaseStorage(app).uploadFileToStorage(imgFile, 'services', "IMG_" + service._id);
            }
            
            await service.save();

            return new responseHandler(200, 'Service saved successfully', service);
        }
        catch(error){
            throw error;
        }
    },

    // Read a service by ID
    getServiceById: async function(serviceId) {
        if(!serviceId || serviceId === 0){
            throw new responseHandler(400, 'The service ID is invalid');
        }
        try{
            const service = await Service.findOne({ _id : serviceId});
            if(!service) throw new responseHandler(404, 'Service not found');
            return new responseHandler(200, 'Service found', service);
        }
        catch(error){
            throw new responseHandler((error.status) ?  error.status : 400, error.message);
        }
    },

    // Read all services
    getAllActiveServices: async function() {
        try{
            const services = await Service.find({status : 1});
            return new responseHandler(200, 'Services found', services);
        }
        catch(error){
            throw new responseHandler(400, error.message);
        }
    },

    // Update a service by ID
    updateServiceById: async function(serviceId, updatedServiceData, imgFile) {
        if(!serviceId || serviceId === 0){
            throw new responseHandler(400, 'The service ID is invalid');
        }
        try{
            const schema = ajvValidateService.getSchemaService();
            ajvServices.validateSchema(schema, updatedServiceData);
            
            if(imgFile) updatedServiceData.imageUrl = await firebaseStorage(app).uploadFileToStorage(imgFile, 'services', "IMG_" + serviceId);

            const service = await Service.findOneAndUpdate({ _id : serviceId}, updatedServiceData, { new : true });
            if(!service) throw new responseHandler(404, 'Service not found');

            return new responseHandler(200, 'Service updated', service);
        }
        catch(error){
            throw new responseHandler((error.status) ?  error.status : 400 , error.message);
        }
    },

    // delete services (set status to 0)
    deleteService: async function(serviceId) {
        if(!serviceId || serviceId === 0){
            throw new responseHandler(400, 'The service ID is invalid');
        }
        try{
            const service = await Service.findOneAndUpdate({ _id : serviceId}, {status : 0}, { new : true });
            if(!service) throw new responseHandler(404, 'Service not found');
            return new responseHandler(200, 'Service deleted', service);
        }
        catch(error){
            throw new responseHandler((error.status) ?  error.status : 400 , error.message);
        }
    }

};
    
module.exports = serviceService;