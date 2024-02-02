const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    services : {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Service',
        required: true
    },
    employeeSchedule : {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'EmployeeSchedule',
        required: true
    },
});

module.exports = mongoose.model('Employee', employeeSchema);;
