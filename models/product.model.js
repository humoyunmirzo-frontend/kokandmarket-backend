module.exports = (sequelize, Sequelize)=>{
    const Product = sequelize.define('product', {
        id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        categoryId:{
            type: Sequelize.INTEGER,
            allowNull: false
        },
        brandId:{
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })

    return Product
}