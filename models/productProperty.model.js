module.exports = (sequelize, Sequelize) => {
    const ProductProperty = sequelize.define('product_property', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        value: {
            type: Sequelize.STRING,
            allowNull: false
        },
        unit: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    ProductProperty.associate = (models) => {
        ProductProperty.belongsToMany(models.Product, {
            through: 'ProductId',
            foreignKey: 'productId',
            otherKey: 'productId',
            as: 'products'
        });
    };
    ProductProperty.associate = (models) => {
        ProductProperty.belongsToMany(models.Property, {
            through: 'ProductId',
            foreignKey: 'productId',
            otherKey: 'productId',
            as: 'products'
        });
    };
    return ProductProperty;
}