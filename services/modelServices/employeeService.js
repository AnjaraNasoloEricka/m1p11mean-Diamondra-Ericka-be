const ajvServices = require('../ajv/ajvServices');
const ajvValidateUser = require('../ajv/ajvValidateUser');
const responseHandler = require('../handler/responseHandler');
const { Employee } = require('../../models/employee');
const { Role } = require('../../models/Role');
const { Customer } = require('../../models/Customer');

const employeeService = {

    // Create a new employee
    createEmployee : async function(employeeData) {
        try {
            const schema = ajvValidateUser.getSchemaSignUp();
            ajvServices.validateSchema(schema, employeeData.user);

            let user = await Employee.findOne({ 'user.email' : employeeData.user.email });
            if (user)
                throw new responseHandler(401, 'This email is already registered as an employee');

            user = await Customer.findOne({ 'user.email' : employeeData.user.email });
            if (user)
                throw new responseHandler(401, 'This email is already registered as a customer');

            employeeData.user.status = 1;

            let role = await Role.findOne({ label : "Employee" });

            if (!role)
                throw new responseHandler(500, 'The role does not exist');

            employeeData.user.role = role;

            let newEmployee = new Employee(employeeData);
            
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
    }
}

module.exports = employeeService;