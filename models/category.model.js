module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define('category', {
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
        imageUrl: {
            type: Sequelize.STRING(10000),
            allowNull: false
        },
        parentId: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    })
    Category.hasMany(Category, { as: 'children', foreignKey: 'parentId' });
    Category.belongsTo(Category, { as: 'parent', foreignKey: 'parentId' });
    return Category
}

