module.exports = (sequelize, Sequelize) => {
    const ProductVariant = sequelize.define('product_variant', {
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
        color: {
            type: Sequelize.JSON,
            allowNull: true
        },
        stock: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        size: {
            type: Sequelize.JSON,
            allowNull: true
        },
        mainImage: {
            type: Sequelize.STRING(10000),
            allowNull: false
        },
        images: {
            type: Sequelize.JSON,
            allowNull: false
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(5000),
            allowNull: false
        },
        categoryId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        productId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    })
    ProductVariant.associate = (models) => {
        ProductVariant.belongsToMany(models.Product, {
            through: 'ProductId',
            foreignKey: 'productId',
            otherKey: 'productId',
            as: 'products'
        });
    };
    return ProductVariant
}