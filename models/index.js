const Sequelize = require('sequelize')

// initialize ORM
const sequelize = new Sequelize('kokand_market', 'postgres', 'humoyun5020', {
    host:'localhost',
    dialect: 'postgres'
})


// create tables
const db = {}
db.Sequelize  = Sequelize
db.sequelize = sequelize


module.exports = db
