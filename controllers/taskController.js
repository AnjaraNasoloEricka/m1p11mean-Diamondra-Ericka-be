const taskService = require("../services/modelServices/taskService");

const taskController = {

    getEmployeeTasksByDate: async(req, res) => {
        try {
            const response = await taskService.getEmployeeTasks(req.params.id, req.params.date);
            return res.status(response.status).json(response);
        }
        catch(err){
            console.error(err);
            return res.status(err.status).json(err);
        }
    },
};

module.exports = taskController;