const { Appointment } = require("../../models/Appointment");
const responseHandler = require("../handler/responseHandler");

const statService = {
    getCAperDay : async function(dateCA){
        try{
            const totalCA = await Appointment.aggregate([
                {
                    $match: {
                        payments: {
                            $elemMatch: {
                                date: new Date(dateCA)
                            }
                        }
                    }
                },
                {
                    $unwind: "$payments"
                },
                {
                    $project: {
                        paymentAmount: {
                            $sum: "$payments.amount"
                        },
                        client : "$client.user.name",
                        employee : "$employee.user.name"
                    }
                }
            ]);

            return new responseHandler(200, "Success", totalCA || []);
        }
        catch(err){
            throw new responseHandler(500, err.message);
        }

    },
    getCAperMonth: async function(year) {
        try{
            const totalAmounts = await Appointment.aggregate([
                {
                    $unwind: "$payments" 
                },
                {
                    $match: {
                        "payments.date": {
                            $gte: new Date(year, 0, 1),
                            $lt: new Date(year + 1, 0, 1)
                        }
                    }
                },
                {
                    $group: {
                        _id: { $month: "$payments.date" },
                        totalAmount: {
                            $sum: "$payments.amount"
                        },
                    }
                },
                {
                    $sort: {
                        "_id": 1
                    }
                }
            ]);
            
            return new responseHandler(200, "Success", totalAmounts);
        }
        catch(err){
            throw new responseHandler(500, err.message);
        }
    }
}

module.exports = statService;