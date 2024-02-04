require('dotenv').config()
const mongoose = require('mongoose')

function connect() {
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.MONGODB_URI)
            .then((res, err) => {
                if (err) reject(err);
                console.log('Connected to MongoDB')
                resolve()
            })
            .catch(err => {
                console.error('Failed to connect to MongoDB:', err)
                reject(err)
            })
    })
}

module.exports = { connect }

