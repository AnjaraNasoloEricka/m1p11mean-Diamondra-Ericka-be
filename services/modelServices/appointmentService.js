const Appointment = require('../../models/Appointment');
const { Employee } = require('../../models/Employee');
const responseHandler = require('../handler/responseHandler');

const appointmentService = {
    getAllAppointmentsByEmployee : async function(userId) {
        try {
            const employeeId = await Employee.findOne({user: userId}).select('_id');

            if (!employeeId) throw new responseHandler(404, "This user is not an employee");

            const appointments = await Appointment.find({employee: employeeId}).populate('client').populate('services').populate('specialOffer');
            return appointments;
        }
        catch(err) {
            throw new responseHandler(500, err.message);
        }
        
    }

};

module.exports = appointmentService;