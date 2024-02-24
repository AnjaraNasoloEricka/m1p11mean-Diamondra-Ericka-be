var schedule = require('node-schedule');
const { sendAppointmentReminder } = require('../utilities');

const appointmentScheduler = {
    remindAppointment : async function(appointment){
        try {
           const delaysInHour = require('../../data/const').appointmentTimeReminder;
           for(delay of delaysInHour){
                (function(delay) { 
                    const dateNotif = new Date(appointment.startDateTime - (delay * 60 * 60 * 1000));
                    schedule.scheduleJob(dateNotif, async () => {
                        await sendAppointmentReminder(appointment, delay);
                    });
                })(delay);
           }
        }
        catch(err){
            throw new Error("Cannot schedule appointment reminder");
        }
    },
    deleteScheduledAppointment : async function(appointment){
        try {
            const delaysInHour = require('../../data/const').appointmentTimeReminder;
            for(delay of delaysInHour){
                const date = new Date(appointment.startDateTime - (delay * 60 * 60 * 1000));

                schedule.scheduledJobs[date] && schedule.scheduledJobs[date].cancel();
            }
        }
        catch(err){
            throw new Error("Cannot delete appointment reminder");
        }
    }
};

module.exports = appointmentScheduler;