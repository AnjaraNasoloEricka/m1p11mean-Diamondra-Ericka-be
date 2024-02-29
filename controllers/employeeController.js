const employeeService = require('../services/modelServices/employeeService');

const employeeController = {

    // Create an employee
    createEmployee: async (req, res) => {
        try {
            
            const response = await employeeService.createEmployee(req.body);
            return res.status(response.status).json(response);
        }
        catch(err){
            console.log(err);
            return res.status(err.status).json(err);
        }
    },

    // Get employee by ID
    getEmployeeById: async (req, res) => {
        try {
            const response = await employeeService.getEmployeeById(req.params.id);
            return res.status(response.status).json(response);
        }
        catch(err){
            return res.status(err.status).json(err);
        }
    },

    // Get all employees
    getAllEmployees: async (req, res) => {
        try {
            const response = await employeeService.getAllEmployees();
            return res.status(response.status).json(response);
        }
        catch(err){
            return res.status(err.status).json(err);
        }
    },

    // Update employee by ID
    updateEmployeeById: async (req, res) => {
        try {
            const response = await employeeService.updateEmployeeById(req.params.id, req.body);
            return res.status(response.status).json(response);
        }
        catch(err){
            return res.status(err.status).json(err);
        }
    },

    // Delete employee by ID
    deleteEmployeeById: async (req, res) => {
        try {
            const response = await employeeService.deleteEmployee(req.params.id);
            return res.status(response.status).json(response);
        }
        catch(err){
            console.log(err);
            return res.status(err.status).json(err);
        }
    },

    // update employee info
    updateEmployeeProfile : async(req, res) => {
        try{
            const id = req.user._id;
            const response = await employeeService.updateEmployeeProfile(id, req.body);
            return res.status(response.status).json(response);
        }
        catch(err){
            console.log(err);
            return res.status(err.status).json(err);
        }
    },

    // get free employees
    getFreeEmployees : async(req, res) => {
        try {
            const date = req.params.date;
            const response = await employeeService.getFreeEmployees(date, req.body.serviceIds);
            return res.status(response.status).json(response);
        } catch (error) {
            return res.status(error.status).json(error);
        }
    }
}

module.exports = employeeController;