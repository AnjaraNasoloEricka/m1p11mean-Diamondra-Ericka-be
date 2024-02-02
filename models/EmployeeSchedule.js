const mongoose = require('mongoose');

const employeeScheduleSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('EmployeeSchedule', employeeScheduleSchema);
