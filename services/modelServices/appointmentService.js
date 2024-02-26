const ajvServices = require('../ajv/ajvServices');
const ajvValidateAppointment = require('../ajv/ajvValidateAppointment');
const { Appointment } = require('../../models/Appointment');
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

            //calculate endDateTime
            let seconds = 0;
            if (newAppointment.services) {
                newAppointment.services.forEach(service => {
                    seconds += service.duration;
                });
            }
            if (newAppointment.specialOffer) {
                newAppointment.specialOffer.services.forEach(service => {
                    seconds += service.duration;
                });
            }
            newAppointment.endDateTime = new Date(newAppointment.startDateTime.getTime() + seconds * 1000);

            //calculate totalPrice
            let price = 0;
            if (newAppointment.services) {
                newAppointment.services.forEach(service => {
                    price += service.price;
                });
            }
            if (newAppointment.specialOffer) {
                newAppointment.specialOffer.services.forEach(service => {
                    price += service.price;
                });
            }
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
    }
    

};

module.exports = appointmentService;