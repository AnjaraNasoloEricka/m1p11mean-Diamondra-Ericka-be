const ajvServices = require('../ajv/ajvServices');
const ajvValidateAppointment = require('../ajv/ajvValidateAppointment');
const Appointment = require('../../models/Appointment');
const { Employee } = require('../../models/Employee');
const { Customer } = require('../../models/Customer');
const { Service } = require('../../models/Service');
const { SpecialOffer } = require('../../models/SpecialOffer');
const responseHandler = require('../handler/responseHandler');
const appointmentScheduler = require('../scheduler/appointmentScheduler');


const appointmentService = {
    getAllAppointmentsByEmployee : async function(userId) {
        try {
            const employeeId = await Employee.findOne({'user._id': userId}).select('_id');

            if (!employeeId) throw new responseHandler(404, "This user is not an employee");

            const appointments = await Appointment.find({employee: employeeId}).populate('client').populate('services').populate('specialOffer');
            return new responseHandler(200, "Employee appointment found", appointments);
        }
        catch(err) {
            throw new responseHandler(500, err.message);
        }
        
    },

    getAllAppointmentsByCustomer : async function(userId) {
        try {
            const customerId = await Customer.findOne({"user._id": userId}).select('_id');
            
            if (!customerId) throw new responseHandler(404, "This user is not a customer");
            const appointments = await Appointment.find({'client._id': customerId}).sort({startDatetime: 1}).populate('employee');
            return new responseHandler(200, "Customer appointments found", appointments);
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

            const customer = await Customer.findOne({_id: appointmentData.customerId});
            if (!customer) throw new responseHandler(404, "Customer not found");
            newAppointment.client = customer;

            if (!appointmentData.serviceIds && !appointmentData.specialOfferId) {
                throw new responseHandler(400, "You must provide at least one service or special offer");
            }

            if (appointmentData.serviceIds) {
                const services = await Service.find({_id: {$in: appointmentData.serviceIds}});
                if (services.length !== appointmentData.serviceIds?.length) throw new responseHandler(404, "One or more services not found");
                newAppointment.services = services;
            }

            if (appointmentData.specialOfferId) {
                const specialOffer = await SpecialOffer.findOne({_id: appointmentData.specialOfferId});
                if (!specialOffer) throw new responseHandler(404, "Special offer not found");
                newAppointment.specialOffer = specialOffer;
            }

           await newAppointment.save();
            await appointmentScheduler.remindAppointment(newAppointment);
            return new responseHandler(200, "Appointment saved successfully", newAppointment);
        }
        catch(err) {
            throw new responseHandler(500, err.message);
        }
    }

};

module.exports = appointmentService;