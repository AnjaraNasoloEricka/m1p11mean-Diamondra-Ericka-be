const { Payment } = require('../../models/Payment');
const ajvValidatePayement = require('../ajv/ajvValidatePayement');
const ajvServices = require('../ajv/ajvServices');
const responseHandler = require('../handler/responseHandler');
const { Appointment } = require('../../models/Appointment');

const payementSevice = {
    async createPayement(payementData, appointmentId) {
        try {
            const schema = ajvValidatePayement.getSchemaPayement();
            ajvServices.validateSchema(schema, payementData);

            let appointment = await Appointment.findOne({_id: appointmentId});
            if (!appointment) throw new responseHandler(404, "Appointment not found");

            if (appointment.leftToPay == 0) throw new responseHandler(400, "The amount is already paid");
            if (appointment.leftToPay < payementData.amount) throw new responseHandler(400, "The amount is higher than the left to pay");
            let newPayement = new Payment(payementData);
            await newPayement.save();

            appointment.payments.push(newPayement);
            appointment.leftToPay -= newPayement.amount;
            await appointment.save();
            
            return new responseHandler(200, 'Payement saved successfully', newPayement);
        }
        catch(error){
            throw error;
        }
    },
}

module.exports = payementSevice;