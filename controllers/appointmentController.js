const appointmentService = require("../services/modelServices/appointmentService");

const appointmentController = { 
    getAllAppointmentsByEmployee: async (req, res) => {
        const userId = req.user._id;
        try{
            const appointments = await appointmentService.getAllAppointmentsByEmployee(userId);
            return res.status(appointments.status).json(appointments);
        }
        catch(err){
            console.error(err);
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
    },

    createAppointment: async (req, res) => {
        try {
            const response = await appointmentService.createAppointment(req.body);
            return res.status(response.status).json(response);
        }
        catch(err){
            return res.status(err.status).json(err);
        }
    },

    remindAppointment: async (req, res) => {
        await appointmentService.remindAppointment();
        return res.status(200).json({message: "Remind sent"});
    }

};

module.exports = appointmentController;