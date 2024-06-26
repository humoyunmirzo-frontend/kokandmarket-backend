const Sequelize = require('sequelize')

// initialize ORM
const sequelize = new Sequelize('kokand_market', 'postgres', 'humoyun5020', {
    host:'localhost',
    dialect: 'postgres'
})


const db = {}
db.Sequelize  = Sequelize
db.sequelize = sequelize

// create tables
db.categories = require('./category.model')(sequelize, Sequelize)
db.brands = require('./brand.model')(sequelize, Sequelize)
db.product_variants = require('./productVariant.model')(sequelize, Sequelize)
db.products = require('./product.model')(sequelize, Sequelize)
db.properties = require('./property.model')(sequelize, Sequelize)
db.productProperties = require('./productProperty.model')(sequelize, Sequelize)

module.exports = db
