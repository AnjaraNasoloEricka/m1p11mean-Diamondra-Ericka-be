const { getCurrentSchedule, getAllSchedule, insertSchedule, updateSchedule, deleteSchedule } = require("../services/modelServices/scheduleService");

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
    },
    insertSchedule: async (req, res) => {
        try {
            const userId = req.user._id;
            const schedule = req.body;
            const result = await insertSchedule(userId, schedule);
            return res.status(result.status).json(result);
        }
        catch (error) {
            return res.status(error.status).json(error);
        }
    },
    updateSchedule: async (req, res) => {
        try {
            const userId = req.user._id;
            const scheduleId = req.params.scheduleId;
            const schedule = req.body;
            const result = await updateSchedule(userId, scheduleId, schedule);
            return res.status(result.status).json(result);
        }
        catch (error) {
            return res.status(error.status).json(error);
        }
    },
    deleteSchedule: async (req, res) => {
        try {
            const userId = req.user._id;
            const scheduleId = req.params.scheduleId;
            const result = await deleteSchedule(userId, scheduleId);
            return res.status(result.status).json(result);
        }
        catch (error) {
            return res.status(error.status).json(error);
        }
    }
};

module.exports = scheduleController;