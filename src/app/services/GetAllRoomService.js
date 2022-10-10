const Room = require("../models/Room");

module.exports = {
  async getAll(userId) {
    try {
      const rooms = await Room.findAll({ where: { userId } });
      return rooms;
    } catch (error) {
      throw new Error(error);
    }
  },
};
