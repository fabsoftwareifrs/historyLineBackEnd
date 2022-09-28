"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Room.init(
    {
      name: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      privater: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  return Room;
};
