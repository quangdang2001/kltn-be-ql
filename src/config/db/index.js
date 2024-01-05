const mongoose = require('mongoose')
    // SECRET
const USER = process.env.MONGO_USER
const PASSWORD = process.env.MONGO_PASSWORD
const MONGO_URI = process.env.MONGO_URI
    // connect

const connect = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,

        })
        console.log('MongoDB connected: ' + conn.connection.host)
    } catch (e) {
        console.log(`Can't connect to DB. Error:${e.message}`)
        process.exit(1)
    }
}

module.exports = { connect }