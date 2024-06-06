module.exports = (sequelize, Sequelize) => {
    const Brand = sequelize.define('brand', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
    })

    return Brand
}