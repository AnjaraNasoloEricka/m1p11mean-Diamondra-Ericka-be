const { now } = require("mongoose");
const { Employee } = require("../../models/Employee");
const ajvValidateEmployeeSchedule = require("../ajv/ajvValidateEmployeeSchedule");
const responseHandler = require("../handler/responseHandler");
const ajvServices = require('../ajv/ajvServices');

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
    },
    checkDuplicateSchedule : async (userId, schedule) => {
        // convert schedule.startDate and schedule.endDate to date
        try{
            // const date1 = new Date('2027-06-11').toISOString();
            // const date2 = new Date('2027-06-12').toISOString();
            // console.log(date1, "date1")

            // const result = await Employee.findOne(
            // {   
            //     $or: [
            //         { 'employeeSchedule.startDate': { $gte: date1, $lte: date2 } },
            //         { 'employeeSchedule.endDate': { $gte: date1, $lte: date2 } }
            //     //     { $and : [{'employeeSchedule.startDate': { $lte: new Date(schedule.startDate).toISOString() }, 'employeeSchedule.endDate': { $gte: new Date(schedule.startDate).toISOString() }}]},
            //     //     { $and : [{'employeeSchedule.startDate': { $lte: new Date(schedule.endDate).toISOString() }, 'employeeSchedule.endDate': { $gte: new Date(schedule.endDate).toISOString() }}]},
            //     // { $and : [{'employeeSchedule.startDate': { $gte: new Date(schedule.startDate).toISOString() }, 'employeeSchedule.endDate': { $lte: new Date(schedule.endDate).toISOString() }}]}
            //     ],
            //     'employeeSchedule': { $exists: true, $ne: [] }
            // },
            // { 'employeeSchedule.$': 1 }
            // ).exec();

            const startDate = new Date('2026-01-11').toISOString();
            const endDate = new Date('2026-01-12').toISOString();

            // const result = await Employee.findOne(
            // {
            //     'employeeSchedule': { $exists: true, $ne: [] },
            //     $or : [
            //         { $and : [{'employeeSchedule.startDate': { $lte: startDate }, 'employeeSchedule.endDate': { $gte: startDate }}]},
            //         { $and : [{'employeeSchedule.startDate': { $lte: endDate }, 'employeeSchedule.endDate': { $gte: endDate }}]},
            //         { $and : [{'employeeSchedule.startDate': { $gte: startDate }, 'employeeSchedule.endDate': { $lte: endDate }}]}     
            // ]},
            // { "employeeSchedule.$": 1 }
            // ).exec();
            console.log(startDate, "startDate")
            console.log(endDate, "endDate")
            const query = Employee.findOne(
                {
                    "employeeSchedule.startDate": {
                        $lte: new Date(endDate),
                    },
                    "employeeSchedule.endDate": {
                        $gte: new Date(startDate),
                    },
                    employeeSchedule: { $exists: true, $ne: [] },employeeSchedule: { $ne: [] },
                },
                { "employeeSchedule.$": 1 }
            );

            const mongoQuery = query.getQuery(); // Obtient la partie de la requête MongoDB
           // const mongoProjection = query.getProjection(); // Obtient la projection MongoDB

            console.log("Requête MongoDB : ", mongoQuery);
           // console.log("Projection MongoDB : ", mongoProjection);
        
            (result) && console.log(result, "day")
            

            if(result.employeeSchedule) throw new responseHandler(400, 'Schedule is already exist');
            return new responseHandler(200, 'Schedule does not exist yet');
        }
        catch(error){
            throw new responseHandler((error.status ? error.status : 400), error.message);
        }
    },
    insertSchedule: async (userId, schedule) => {
        try {
            const schema = ajvValidateEmployeeSchedule.getSchemaEmployeeSchedule();

            ajvServices.validateSchema(schema, schedule);


            const checkDuplicate = await scheduleService.checkDuplicateSchedule(userId, schedule);

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
            console.log(error);
            throw new responseHandler((error.status ? error.status : 400), error.message);
        } 
    },
    updateSchedule: async (userId, scheduleId, schedule) => {
        try {
            const schema = ajvValidateEmployeeSchedule.getSchemaEmployeeSchedule();

            ajvServices.validateSchema(schema, schedule);

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