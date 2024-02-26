const ajvServices = require('../ajv/ajvServices');
const { Appointment } = require('../../models/Appointment');
const { Employee } = require('../../models/Employee');
const { Customer } = require('../../models/Customer');
const { Service } = require('../../models/Service');
const responseHandler = require('../handler/responseHandler');
const { response } = require('../../app');
const appointmentService = require('../../services/modelServices/appointmentService');


const customerService = {
    getCustomerMostUsedServices: async function (userId, number) {
        try {
            const appointments = await this.getCustomerAppointments(userId);
            return new responseHandler(200, 'test', appointments);
        }catch (error) {
            throw new responseHandler((error.status) ?  error.status : 400, error.message);
        }
    },

    getCustomerAppointments : async function(userId) {
        try {
            const customerId = await Customer.findOne({"user._id": userId}).select('_id');
            
            if (!customerId) throw new responseHandler(404, "This user is not a customer");
            const appointments = await Appointment.find({'client._id': customerId}).sort({startDatetime: 1}).populate('employee');
            return new responseHandler(200, "Customer appointments found", appointments);
        }
        catch(err) {
            throw new responseHandler(500, err.message);
        }
    },    
}

module.exports = customerService;