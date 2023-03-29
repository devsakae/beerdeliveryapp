const ProductModel = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    urlImage: DataTypes.STRING,
  }, {
    tableName: 'products',
    underscored: true,
    timestamps: false
  });

  // Product.associate = (models) => {
  //   Product.belongsToMany(models.Sale, { through: 'sales_products', as: 'sales', foreignKey: 'productId' });
  // };

  return Product;
};