"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    static associate(models) {
      Room.belongsTo(models.User, { foreignKey: "userId" });
      Room.hasMany(models.Data, { foreignKey: "roomId" });
    }
  }
  Room.init(
    {
      name: DataTypes.STRING,
      privater: DataTypes.BOOLEAN,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Room",
    }
  );
  return Room;
};
