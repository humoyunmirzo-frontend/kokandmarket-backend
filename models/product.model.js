module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('product', {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        categoryId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        brandId: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    })
    Product.associate = (models) => {
        Product.belongsToMany(models.Brand, {
            through: 'ProductBrand',
            foreignKey: 'productId',
            otherKey: 'brandId',
            as: 'brands'
        });

        Product.belongsToMany(models.Category, {
            through: 'ProductCategory',
            foreignKey: 'productId',
            otherKey: 'categoryId',
            as: 'categories'
        });
    };
    return Product
}