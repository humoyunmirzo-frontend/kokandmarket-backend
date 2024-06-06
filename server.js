const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const database = require('./models/index')
dotenv.config()

// initialize app
const app = express()
const PORT = process.env.PORT || 3000
// initialize middlewares
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//initialize routes 


// initialize server
const startServer = async () => {
    try {
        const connect = await database.sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

startServer()