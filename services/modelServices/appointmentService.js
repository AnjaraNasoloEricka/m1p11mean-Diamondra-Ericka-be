const ajvServices = require('../ajv/ajvServices');
const ajvValidateAppointment = require('../ajv/ajvValidateAppointment');
const { Appointment } = require('../../models/Appointment');
const { Employee } = require('../../models/Employee');
const { Customer } = require('../../models/Customer');
const { Service } = require('../../models/Service');
const { SpecialOffer } = require('../../models/SpecialOffer');
const responseHandler = require('../handler/responseHandler');
const appointmentScheduler = require('../scheduler/appointmentScheduler');
const employeeService = require('./employeeService');


const appointmentService = {
    getAllAppointmentsByEmployee : async function(userId) {
        try {
            const employeeId = await Employee.findOne({'user._id': userId}).select('_id');

            if (!employeeId) throw new responseHandler(404, "This user is not an employee");

            const appointments = await Appointment.find({employee: employeeId});
            
            return new responseHandler(200, "Employee appointment found", appointments);
        }
        catch(err) {
            throw new responseHandler(500, err.message);
        }
        
    },

    getAllAppointmentsByEmployeeByDate : async function(userId, date) {
        try {
            if (!userId || userId === 0) throw new responseHandler(400, "The user ID is invalid");
            const employeeId = await Employee.findOne({"user._id": userId}).select('_id');

            //if (!employeeId) throw new responseHandler(404, "This user is not an employee");

            const appointments = await Appointment.find({'employee.user._id': userId, startDateTime: {$gte: date, $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000)}});
            return new responseHandler(200, "Employee appointment found", appointments);
        }
        catch(err) {
            throw new responseHandler(500, err.message);
        }
    },

    createAppointment : async function(appointmentData) {
        try {
            const schema = ajvValidateAppointment.getSchemaAppointment();
            ajvServices.validateSchema(schema, appointmentData);

            let newAppointment = new Appointment(appointmentData);
            
            const employee = await Employee.findOne({_id: appointmentData.employeeId});
            if (!employee) throw new responseHandler(404, "Employee not found");
            newAppointment.employee = employee;

            const customer = await Customer.findOne({"user._id": appointmentData.customerId});
            if (!customer) throw new responseHandler(404, "Customer not found");
            newAppointment.client = customer;

            if (!appointmentData.services || appointmentData.services.length === 0) {
                throw new responseHandler(400, "You must provide at least one service");
            }

            const services = await Service.find({_id: {$in : appointmentData.services}});
            if (services.length !== appointmentData.services.length) {
                throw new responseHandler(404, "One or more services not found");
            }

            newAppointment.services = services;

            //check if service is in special offer
            const specialOffer = await SpecialOffer.findOne({services: newAppointment.services, startDate: {$lte: newAppointment.startDateTime}, endDate: {$gte: newAppointment.startDateTime}}).populate('services');
            if (specialOffer) {
                newAppointment.specialOffer = specialOffer;
            }

            //calculate endDateTime
            let seconds = 0;
        
            newAppointment.services.forEach(service => {
                seconds += service.duration;
            });
            
            newAppointment.endDateTime = new Date(newAppointment.startDateTime.getTime() + seconds * 1000);

            //calculate totalPrice
            let price = 0;
            
            if (newAppointment.specialOffer) {
                if (newAppointment.specialOffer.reductionType === 'percentage') {
                    newAppointment.specialOffer.services.forEach(service => {
                        price += service.price;
                    });
                    console.log(price);
                    price = price - (price * newAppointment.specialOffer.reductionValue / 100);
                    console.log(price);
                }
                else {
                    newAppointment.specialOffer.services.forEach(service => {
                        price += service.price;
                    });
                    price -= newAppointment.specialOffer.reductionValue;
                }
            }

            else if (newAppointment.services) {
                newAppointment.services.forEach(service => {
                    price += service.price;
                });
            }
            
            console.log(price);
            newAppointment.totalPrice = price;
            newAppointment.leftToPay = price;
            await newAppointment.save();
            await appointmentScheduler.remindAppointment(newAppointment);
            return new responseHandler(200, "Appointment saved successfully", newAppointment);
        }
        catch(err) {
            console.error(err);
            throw new responseHandler(500, err.message);
        }
    },

    getAppointmentById: async function(appointmentId) {
        if (!appointmentId || appointmentId === 0) {
            throw new responseHandler(400, 'The appointment ID is invalid');
        }
        try {
            const appointment = await Appointment.findById(appointmentId);
            if (!appointment) throw new responseHandler(404, "Appointment not found");
            return new responseHandler(200, "Appointment found", appointment);
        }
        catch(err) {
            console.error(err);
            throw new responseHandler(500, err.message);
        }
    },
    
    updateAppointmentStatus: async function(appointmentId, status) {
        if (!appointmentId || appointmentId === 0) {
            throw new responseHandler(400, 'The appointment ID is invalid');
        }
        try {
            const appointment = await Appointment.findOneAndUpdate({_id: appointmentId}, {status: status}, {new: true});
            if (!appointment) throw new responseHandler(404, "Appointment not found");
            return new responseHandler(200, "Appointment updated successfully", appointment);
        }
        catch(err) {
            console.error(err);
            throw new responseHandler(500, err.message);
        }
    },

};

module.exports = appointmentService;