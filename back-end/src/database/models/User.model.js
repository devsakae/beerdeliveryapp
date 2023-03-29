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

  // User.associate = (models) => {
  //   User.hasMany(models.Sale, { foreignKey: 'userId', as: 'sales' });
  //   User.hasMany(models.Sale, { foreignKey: 'sellerId', as: 'sales' });
  // };

  return User;
};