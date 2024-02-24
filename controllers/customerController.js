const customerService = require('../services/modelServices/customerService');

const customerController = {
    getCustomerMostUsedServices : async(req, res) => {
        const userId = req.user._id;
        try {
            const response = await customerService.getCustomerMostUsedServices(userId, 2);
            return res.status(response.status).json(response);
        }
        catch(err){
            return res.status(err.status).json(err);
        }
    },
}

module.exports = customerController;