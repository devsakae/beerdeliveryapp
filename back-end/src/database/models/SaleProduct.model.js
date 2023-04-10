const SaleProductModel = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    saleId: {
     type: DataTypes.INTEGER,
    },
    productId: {
      type: DataTypes.INTEGER,
    },
    quantity: DataTypes.INTEGER,
  }, {
    tableName: 'sales_products',
    underscored: true,
    timestamps: false,
  });

  SaleProduct.associate = (models) => {
    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      foreignKey: 'saleId',
      otherKey: 'productId',
      through: SaleProduct,
    });
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      foreignKey: 'productId',
      otherKey: 'saleId',
      through: SaleProduct,
    });
  };

  return SaleProduct;
};

module.exports = SaleProductModel;
