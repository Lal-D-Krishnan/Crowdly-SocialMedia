const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn =await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
        })

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
    } catch (error) {
        console.log(error);
        process.exit(1) // close the process with a failure
    }
}

module.exports = connectDB