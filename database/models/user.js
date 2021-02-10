const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      defaultScope: {
        rawAttributes: { exclude: ['password'] },
      },
    },
  );

  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  // User.prototype.generatePasswordHash = function () {
  //   if (this.password) {
  //     return bcrypt.hash(this.password, 10);
  //   }
  // };

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Post, { foreignKey: 'userId', as: 'posts' });
  };

  return User;
};