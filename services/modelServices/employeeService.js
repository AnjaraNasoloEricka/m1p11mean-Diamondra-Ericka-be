const ajvServices = require('../ajv/ajvServices');
const ajvValidateUser = require('../ajv/ajvValidateUser');
const responseHandler = require('../handler/responseHandler');
const { Employee } = require('../../models/Employee');
const { Role } = require('../../models/Role');
const { Customer } = require('../../models/Customer');
const { User } = require('../../models/User');
const bcrypt = require('bcrypt');
const { Appointment } = require('../../models/Appointment');
const { Service } = require('../../models/Service');

const employeeService = {

    // Create a new employee
    createEmployee : async function(employeeData) {
        try {
            const schema = ajvValidateUser.getSchemaSignUp();
            ajvServices.validateSchema(schema, employeeData.user);

            let user = await Employee.findOne({ 'user.email' : employeeData.user.email });
            if (user) throw new responseHandler(401, 'This email is already registered as an employee');

            user = await Customer.findOne({ 'user.email' : employeeData.user.email });
            if (user) throw new responseHandler(401, 'This email is already registered as a customer');

            employeeData.user.status = 1;

            let role = await Role.findOne({ label : "Employee" });
            if (!role) throw new responseHandler(500, 'The role does not exist');

            employeeData.user.role = role;

            let newUser = new User(employeeData.user);

            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            newUser.password = await bcrypt.hash(newUser.password, salt);
            

            await newUser.save();

            let newEmployee = new Employee(employeeData);
            newEmployee.user = newUser;
            
            await newEmployee.save();

            return new responseHandler(200, "Employee saved successfully", newEmployee);
        }
        catch(error){
            throw error;    
        }
    },

    // Get employee by ID
    getEmployeeById : async function(employeeId) {
        if(!employeeId || employeeId === 0){
            throw new responseHandler(400, 'The employee ID is invalid');
        }
        try {
            const employee = await Employee.findById(employeeId);
            if (!employee) throw new responseHandler(404, 'Employee is not found');
            return new responseHandler(200, "Employee is found", employee);
        }
        catch(err){
            throw new responseHandler((error.status) ?  error.status : 400, error.message);
        }
    },

    // Get all employees
    getAllEmployees : async function() {
        try {
            const employees = await Employee.find({status : 1});
            return new responseHandler(200, "Employees found", employees);
        }
        catch(error){
            throw new responseHandler(400, error.message);
        }
    },

    // Update employee by ID
    updateEmployeeById : async function(employeeId, updatedEmployeeData) {
        if(!employeeId || employeeId === 0){
            throw new responseHandler(400, 'The employee ID is invalid');
        }
        try {
            const schema = ajvValidateUser.getSchemaSignUp();
            ajvServices.validateSchema(schema, updatedEmployeeData.user);

            const employee = await Employee.findOneAndUpdate({ _id : employeeId}, updatedEmployeeData, {new: true});
            if (!employee) throw new responseHandler(404, 'Employee is not found');
            
            return new responseHandler(200, "Employee updated successfully", employee);
        }
        catch(error){
            throw new responseHandler((error.status) ?  error.status : 400, error.message);
        }
    },

    // Delete employee (set status to 0)
    deleteEmployee : async function(employeeId) {
        if(!employeeId || employeeId === 0){
            throw new responseHandler(400, 'The employee ID is invalid');
        }
        try {
            const employee = await Employee.findOneAndUpdate({ _id : employeeId}, {status : 0}, {new: true});
            if (!employee) throw new responseHandler(404, 'Employee is not found');
            
            return new responseHandler(200, "Employee deleted successfully", employee);
        }
        catch(error){
            throw new responseHandler((error.status) ?  error.status : 400, error.message);
        }
    },

    //update employee info profile
    updateEmployeeProfile: async function(userId, userData){
        try {
            const schema = ajvValidateUser.getSchemaProfil();
            ajvServices.validateSchema(schema, userData);
        
            let user = await User.findOneAndUpdate(
                { '_id': userId },
                { $set: userData }, 
                { new: true }
            ).exec();
        
            if (!user) {
                throw new responseHandler(400, 'No user with this id was found');
            }
        
            let employee = await Employee.findOneAndUpdate(
                { 'user._id': userId },
                { $set: { 'user': { '_id': userId, ...userData } } }, 
                { new: true }
            ).exec();
        
            if (!employee) {
                throw new responseHandler(400, 'Employee is not found');
            }
        
            return new responseHandler(200, "Successfully updated", employee);
        } 
        catch(error){
            throw new responseHandler((error.status) ?  error.status : 400, error.message);
        }
    },

    getFreeEmployees: async function(date, serviceIds) {
        try {
            date = new Date(date);
            let employees = await Employee.find({status : 1});
            let freeEmployees = [];
            for (let employee of employees) {
                let isFree = true;

                const startDay = new Date(date);
                startDay.setHours(0, 0, 0, 0);
                const endDay = new Date(date);
                endDay.setHours(23, 59, 59, 999);

                 //calculate endDateTime
                let seconds = 0;
            
                const services = await Service.find({_id: {$in : serviceIds}});
                if (services.length !== serviceIds.length) {
                    throw new responseHandler(404, "One or more services not found");
                }

                services.forEach(service => {
                    seconds += service.duration;
                });
            
                endDateTime = new Date(date.getTime() + seconds * 1000);

                let appointments = await Appointment.find({employee: employee, startDateTime: { $gte: startDay, $lte: endDay }});
                for (let appointment of appointments) {
                    if (appointment.startDateTime.getTime() <= date.getTime() && appointment.endDateTime.getTime() >= date.getTime()) {
                        isFree = false;
                        break;
                    }
                    
                    if (appointment.startDateTime.getTime() <= endDateTime.getTime() && appointment.endDateTime.getTime() >= endDateTime.getTime()) {
                        isFree = false;
                        break;
                    }
                }
                if (isFree) {
                    freeEmployees.push(employee);
                }
            }
            return new responseHandler(200, "Employees found", freeEmployees);
        }
        catch(error){
            throw new responseHandler((error.status) ?  error.status : 400, error.message);
        }
    }
}

module.exports = employeeService;