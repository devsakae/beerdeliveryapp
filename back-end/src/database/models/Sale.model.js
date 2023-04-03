'use strict';

const SaleModel = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL(10, 2),
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: DataTypes.DATE,
    status: DataTypes.STRING,
  }, {
    tableName: 'sales',
    underscored: true,
    timestamps: false,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Sale.belongsTo(models.User, { foreignKey: 'sellerId', as: 'seller' });
  };

  return Sale;
};

module.exports = SaleModel;
