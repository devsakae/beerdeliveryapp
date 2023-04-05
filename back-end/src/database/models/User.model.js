'use strict';

const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  }, {
    tableName: 'users',
    timestamps: false,
    underscored: true,
  });

  User.associate = (models) => {
    User.hasMany(models.Sale, {
      foreignKey: 'id', as: 'userId'
    });
    User.hasMany(models.Sale, {
      foreignKey: 'id', as: 'sellerId'
    });
  };

  return User;
};

module.exports = UserModel;
