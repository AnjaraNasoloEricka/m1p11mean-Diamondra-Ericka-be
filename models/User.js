const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role',
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        required: true,
        default: 0
    },
    },
    {
        collection : 'user'
    });

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ 
        _id: this._id,
        name: this.name,
        email: this.email,
        role: this.role
    }, process.env.TOKEN_SECRET);
    return token;
};

const User = mongoose.model('User', userSchema);


module.exports = { User };
