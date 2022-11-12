const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const colors = require('colors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()
const connectDB = require('./config/db')

const app = express()
const port = process.env.PORT || 8000

connectDB()
//import routes
const authRoutes = require('./routes/auth.js') // now we need to make this work as a middlewear

//app middlewear
app.use(morgan('dev'))
app.use(express.json())
app.use(bodyParser.json())

app.use(cors()) // allows all origins
if(process.env.NODE_ENV !== 'development'){
    app.use(cors({orign: `http://localhost:3000` }))
}

//middlewear 
app.use('/api',authRoutes)

app.listen(port, ()=>{
    console.log(`API is running on port ${port} - ${process.env.NODE_ENV}`)
})