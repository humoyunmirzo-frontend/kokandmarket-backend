const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors')
const database = require('./models/index')
dotenv.config()

// initialize app
const app = express()
const PORT = process.env.PORT || 3000

// initialize middlewares
app.use(cors({origin: "*"}))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//initialize routes 
app.use('/api/v1/brand', require('./routes/brand.route'))
app.use('/api/v1/category', require('./routes/category.route'))
app.use('/api/v1/product', require('./routes/product.route'))
app.use('/api/v1/product-variant', require('./routes/productVariant.route'))
app.use('/api/v1/property', require('./routes/property.route'))
app.use('/api/v1/product-property', require('./routes/productProperty.route'))
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