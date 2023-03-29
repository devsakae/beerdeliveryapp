const SaleProductModel = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SaleProduct', {
    saleId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  }, {
    tableName: 'sales_products',
    underscored: true,
    timestamps: false
  });

  SaleProduct.associate = (models) => {
    SaleProduct.belongsTo(models.Sale, { foreignKey: 'saleId', as: 'sale' });
    SaleProduct.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
  };

  return SaleProduct;
};