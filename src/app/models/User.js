"use strict";
const { Model } = require("sequelize");
const secret = "weffvrrfs";
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Room, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      passwordHash: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  // User.beforeSave(async (user) => {
  //   if (user.password) {
  //     user.passwordHash = await bcrypt.hash(user.password, 8);
  //   }
  // });

  return User;
};
