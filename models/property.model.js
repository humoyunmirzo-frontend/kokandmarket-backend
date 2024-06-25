module.exports = (sequelize, Sequelize) => {
    const Property = sequelize.define('property', {
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

    return Property;
}