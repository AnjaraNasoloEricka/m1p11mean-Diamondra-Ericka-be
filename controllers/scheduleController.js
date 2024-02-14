const { getCurrentSchedule, getAllSchedule } = require("../services/modelServices/scheduleService");

const scheduleController = {
    getCurrentSchedule: async (req, res) => {
        try {
            const currentDate = new Date(new Date().toLocaleString("en-US", { timeZone: process.env.UTC_TIMEZONE }));
            // add UTC offset to current date
            currentDate.setHours(currentDate.getHours() + process.env.UTC_TIMEZONE_OFFSET);
            // add UTC offset to current date
            const userId = req.user._id;
            const schedule = await getCurrentSchedule(currentDate, userId);
            return res.status(schedule.status).json(schedule);
        }
        catch (error) {
            return res.status(error.status).json(error);
        }
    },
    getAllSchedule: async (req, res) => {
        try {
            const userId = req.user._id;
            const schedule = await getAllSchedule(userId);
            return res.status(schedule.status).json(schedule);
        }
        catch (error) {
            return res.status(error.status).json(error);
        }
    }
};

module.exports = scheduleController;