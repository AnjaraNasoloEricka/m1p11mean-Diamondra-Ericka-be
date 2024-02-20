const Payement = require('../../models/Payement');
const ajvValidatePayement = require('../ajvSchemas/ajvValidatePayement');
const ajvServices = require('../ajvSchemas/ajvServices');
const responseHandler = require('../handler/responseHandler');
const { Appointment } = require('../../models/Appointment');

const payementSevice = {
    async createPayement(payementData, appointmentId) {
        try {
            const schema = ajvValidatePayement.getSchemaPayement();
            ajvServices.validateSchema(schema, payementData);

            let appointment = await Appointment.findOne({_id: appointmentId});
            if (!appointment) throw new responseHandler(404, "Appointment not found");

            let newPayement = new Payement(payementData);
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