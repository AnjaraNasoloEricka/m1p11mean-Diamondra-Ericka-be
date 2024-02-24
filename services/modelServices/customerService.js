const ajvServices = require('../ajv/ajvServices');
const Appointment = require('../../models/Appointment');
const { Employee } = require('../../models/Employee');
const { Customer } = require('../../models/Customer');
const { Service } = require('../../models/Service');
const responseHandler = require('../handler/responseHandler');
const { response } = require('../../app');
const appointmentService = require('../../services/modelServices/appointmentService');


const customerService = {
    getCustomerMostUsedServices: async function (userId, number) {
        try {
            const appointments = await appointmentService.getAllAppointmentsByCustomer(userId);
            return new responseHandler(200, 'test', appointments);
        }catch (error) {
            throw new responseHandler((error.status) ?  error.status : 400, error.message);
        }
    }
}

module.exports = customerService;