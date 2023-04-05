'use strict';

const SaleProductModel = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    saleId: {
     type: DataTypes.INTEGER,
      foreignKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    quantity: DataTypes.INTEGER,
  }, {
    tableName: 'sales_products',
    underscored: true,
    timestamps: false
  });


  SaleProduct.associate = (models) => {
    models.Product.belongsToMany(models.Sale, {
      through: SaleProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
      as: 'sales',
    });

      models.Sale.belongsToMany(models.Product, {
        through: SaleProduct,
        foreignKey: 'saleId',
        otherKey: 'productId',
        as: 'products',
      });
      
    };

  // SaleProduct.associate = (models) => {
  //   SaleProduct.belongsTo(models.Sale, { foreignKey: 'saleId', as: 'sale' });
  //   SaleProduct.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });

  return SaleProduct;
};

module.exports = SaleProductModel;
