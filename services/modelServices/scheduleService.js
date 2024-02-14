const { $where } = require("../../models/Appointment");
const { Employee } = require("../../models/Employee");
const responseHandler = require("../handler/responseHandler");

const scheduleService = {
    getCurrentSchedule: async (currentDate, userId) => {
        try {
            const schedule = await Employee.findOne({
                'user._id': userId,
                'employeeSchedule.startDate': { $lte: currentDate },
                'employeeSchedule.endDate': { $gte: currentDate }
            }, {'employeeSchedule.$': 1}).exec();
            if (!schedule) throw new responseHandler(404, 'Schedule is not found');
            return new responseHandler(200, "Schedule is found", schedule);
        }
        catch (error) {
            throw new responseHandler((error.status ? error.status : 400), error.message);
        }
    },
    getAllSchedule : async (userId) => {
        try {
            const schedule = await Employee.find({ 'user._id': userId }).select('employeeSchedule');
            if (!schedule) throw new responseHandler(404, 'Schedule is not found or user is not an employee');
            return new responseHandler(200, "Schedules are found", schedule);
        }
        catch (error) {
            throw new responseHandler((error.status ? error.status : 400), error.message);
        }
    }
};

module.exports = scheduleService;