const statService = require("../services/modelServices/statServices");

const statController = {
    getCAperDay : async function(req, res){
        const date = req.params.date;
        try{
            const totalAmount = await statService.getCAperDay(date);
            return res.status(totalAmount.status).json(totalAmount);
        }
        catch(err){
            return res.status(err.status).json(err);
        }
    },
    getCAperMonth : async function(req, res){
        const year = req.params.year;
        try{
            const totalAmounts = await statService.getCAperMonth(year);
            return res.status(totalAmounts.status).json(totalAmounts);
        }
        catch(err){
            return res.status(err.status).json(err);
        }
    }

};

module.exports = statController;