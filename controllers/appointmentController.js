const appointmentService = require("../services/modelServices/appointmentService");

const appointmentController = { 
    getAllAppointmentsByEmployee: async (req, res) => {
        const userId = req.user.id;
        try{
            const appointments = await appointmentService.getAllAppointmentsByEmployee(userId);
            return res.status(appointments.status).json(appointments);
        }
        catch(err){
            return res.status(err.status).json(err);
        }
    },

    getAllAppointmentsByCustomer: async (req, res) => {
        const userId = req.body.user._id;
        try{
            const appointments = await appointmentService.getAllAppointmentsByCustomer(userId);
            return res.status(appointments.status).json(appointments);
        }
        catch(err){
            return res.status(err.status).json(err);
        }
    }
};

module.exports = appointmentController;