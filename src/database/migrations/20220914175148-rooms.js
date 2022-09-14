'use strict';

const sequelize = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
   const rooms = queryInterface.createTable("Rooms", {
    id: {
      type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allownul: false,
    },
    room_password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    private: {
      type: Sequelize.BOOLEAN
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    host_room: {
      name.hasOne()
    }
   })
   return rooms;
  },

  async down (queryInterface, Sequelize) {
   queryInterface.dropTable("Rooms")
  }
};
