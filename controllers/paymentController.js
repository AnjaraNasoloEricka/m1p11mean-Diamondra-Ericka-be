const payementSevice = require("../services/modelServices/payementService");

const payementController = {
    savePayment: async(req, res) => {
        try {
            
            const response = await payementSevice.createPayement(req.body, req.params.appointmentId);
            return res.status(response.status).json(response);
        }
        catch(err){
            console.log(err);
            return res.status(err.status).json(err);
        }
    }
};

module.exports = payementController;