const appointmentService = require("./appointmentService");
const responseHandler = require('../handler/responseHandler');

const taskService = {
    getEmployeeTasks: async function (userId, date) {
        try {
            date = new Date(date);
            const response = await appointmentService.getAllAppointmentsByEmployeeByDate(userId, date);
            if (response.status !== 200) throw new responseHandler(response.status, response.message);
            const appointments = response.data;
            let commission = 0;
            appointments.forEach(appointment => {
                if (appointment.status !== 'done') return;
                commission += appointment.services.reduce((acc, service) => acc + service.commissionValue, 0);
                commission += appointment.specialOffer.reduce((acc, service) => acc + service.commissionValue, 0);
            });

            const toCome = appointments.filter(appointment => appointment.status === 'toCome');
            const inProgress = appointments.filter(appointment => appointment.status === 'inProgress');
            const done = appointments.filter(appointment => appointment.status === 'done');

            return new responseHandler(200, 'test', {toCome, inProgress, done, commission});
        }catch (error) {
            throw new responseHandler((error.status) ?  error.status : 400, error.message);
        }
    },

};

module.exports = taskService;