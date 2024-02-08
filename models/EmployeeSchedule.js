const mongoose = require('mongoose');

const employeeScheduleSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    day: {
        type: [String],
        required: true
    },
    startHour: {
        type: String,
        required: true
    },
    endHour: {
        type: String,
        required: true
    }
},
{
    collection: 'employee.schedule'
});

const EmployeeSchedule = mongoose.model('EmployeeSchedule', employeeScheduleSchema);
module.exports = { EmployeeSchedule };
