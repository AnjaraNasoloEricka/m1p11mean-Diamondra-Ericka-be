require('dotenv').config()
const mongoose = require('mongoose')

function connect() {
    return new Promise((resolve, reject) => {
        mongoose.connect(process.env.MONGODB_URI)
            .then((res, err) => {
                if (err) return reject(err)
                console.log('Connected to MongoDB')
                resolve()
            })
    })
}

module.exports = { connect }

