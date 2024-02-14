const Appointment = require('../../models/Appointment');
const { Employee } = require('../../models/Employee');
const { Customer } = require('../../models/Customer');
const responseHandler = require('../handler/responseHandler');
const { response } = require('../../app');

const appointmentService = {
    getAllAppointmentsByEmployee : async function(userId) {
        try {
            const employeeId = await Employee.findOne({'user._id': userId}).select('_id');

            if (!employeeId) throw new responseHandler(404, "This user is not an employee");

            const appointments = await Appointment.find({employee: employeeId}).populate('client').populate('services').populate('specialOffer');
            return new responseHandler(200, "Employee appointment found", appointments);
        }
        catch(err) {
            console.error(err);
            throw new responseHandler(500, err.message);
        }
        
    },

    getAllAppointmentsByCustomer : async function(userId) {
        try {
            const customerId = await Customer.findOne({"user._id": userId}).select('_id');
            
            if (!customerId) throw new responseHandler(404, "This user is not a customer");

            const appointments = await Appointment.find({client: customerId}).populate('employee').populate('services').populate('specialOffer');
            return new responseHandler(200, "Customer endpoints found", appointments);
        }
        catch(err) {
            throw new responseHandler(500, err.message);
        }
    }

};

module.exports = appointmentService;