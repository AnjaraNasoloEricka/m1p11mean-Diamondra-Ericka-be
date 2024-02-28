const { now } = require("mongoose");
const { Employee } = require("../../models/Employee");
const ajvValidateEmployeeSchedule = require("../ajv/ajvValidateEmployeeSchedule");
const responseHandler = require("../handler/responseHandler");
const ajvServices = require('../ajv/ajvServices');
const hourUtilities = require('../hourUtilities');

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
            console.log("user ", userId);
            const schedule = await Employee.find({ 'user._id': userId }).select('employeeSchedule');
            if (!schedule) throw new responseHandler(404, 'Schedule is not found or user is not an employee');
            return new responseHandler(200, "Schedules are found", schedule);
        }
        catch (error) {
            throw new responseHandler((error.status ? error.status : 400), error.message);
        }
    },
    checkDuplicateSchedule : async (userId, schedule) => {
        try{
            schedule.startHour = hourUtilities.getSecondTotal(schedule.startHour);
            schedule.endHour = hourUtilities.getSecondTotal(schedule.endHour);

            await scheduleService.checkScheduleDateAndHour(schedule);
            const result = await Employee.findOne(
                {
                    $or: [
                        {
                            'user._id': userId,
                            employeeSchedule: {
                                $elemMatch: {
                                    'startDate': { $lte: schedule.startDate },
                                    'endDate': { $gte: schedule.endDate },
                                    'day': { $in: schedule.day }
                                }                                
                            }
                        }
                    ]
                },
                { "employeeSchedule.$": 1 }
            ).exec();

            if(result){
                if((!schedule._id)||((result.employeeSchedule[0]._id.toString() !== schedule._id.toString()))) throw new responseHandler(400, 'Schedule already exist');
            }
            return new responseHandler(200, 'Schedule does not exist yet');
        }
        catch(error){
            console.log(error);
            throw new responseHandler((error.status ? error.status : 400), error.message);
        }
    },
    checkScheduleDateAndHour: async (schedule) => {
        if((schedule.endDate) && (new Date(schedule.startDate) > new Date(schedule.endDate))) throw new responseHandler(400, 'Start date is greater than end date');
        if(schedule.startHour > schedule.endHour) throw new responseHandler(400, 'Start hour is greater than end hour');
      
    },
    insertSchedule: async (userId, schedule) => {
        try {
            const schema = ajvValidateEmployeeSchedule.getSchemaEmployeeSchedule();

            ajvServices.validateSchema(schema, schedule);
            
            await scheduleService.checkDuplicateSchedule(userId, schedule);

            const result = await Employee.updateOne({
                'user._id': userId
            }, {
                $push: {
                    employeeSchedule: schedule
                }
            }).exec();

            if (result.nModified === 0) throw new responseHandler(400, 'Schedule is not inserted');

            return new responseHandler(200, 'Schedule is inserted', schedule);
        }
        catch (error) {
            throw new responseHandler((error.status ? error.status : 400), error.message);
        } 
    },
    updateSchedule: async (userId, scheduleId, schedule) => {
        try {
            const schema = ajvValidateEmployeeSchedule.getSchemaEmployeeSchedule();

            ajvServices.validateSchema(schema, schedule);

            await scheduleService.checkDuplicateSchedule(userId, schedule);

            const result = await Employee.updateOne({
                'user._id': userId,
                'employeeSchedule._id': scheduleId
            }, {
                $set: {
                    'employeeSchedule.$': schedule
                }
            }).exec();

            if (result.nModified === 0) throw new responseHandler(400, 'Schedule is not updated');

            return new responseHandler(200, 'Schedule is updated', schedule);
        }
        catch (error) {
            throw new responseHandler((error.status ? error.status : 400), error.message);
        } 
    },
    deleteSchedule: async (userId, scheduleId) => {
        try {
            // set endDate to current date
            const result = await Employee.updateOne({
                'user._id': userId,
                'employeeSchedule._id': scheduleId
            }, {
                $set: {
                    'employeeSchedule.$.endDate': now(),
                }
            }).exec();

            if (result.nModified === 0) throw new responseHandler(400, 'Schedule is not deleted');

            return new responseHandler(200, 'Schedule is deleted');
        }
        catch (error) {
            throw new responseHandler((error.status ? error.status : 400), error.message);
        } 
    }
};

module.exports = scheduleService;