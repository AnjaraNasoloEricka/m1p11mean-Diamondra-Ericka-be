const mongoose = require('mongoose');
const { User } = require('./User');
const { EmployeeSchedule } = require('./EmployeeSchedule');
const { Service } = require('./Service');

const employeeSchema = new mongoose.Schema({
        _id : {
            type: mongoose.Schema.Types.ObjectId,
            auto: true
        },
        user : {
            type: User.schema,
            required: true
        },
        services : {
            type: [Service.schema],
            ref: 'Service',
            required: true
        },
        employeeSchedule : {
            type: [EmployeeSchedule.schema],
            ref: 'EmployeeSchedule',
            required: true
        },
        status : {
            type: Number,
            default: 1,
            enum: [0, 1],
            required: true
        }
    },
    {
        collection : 'employee'
    });

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = { Employee };
