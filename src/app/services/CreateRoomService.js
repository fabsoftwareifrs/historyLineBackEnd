const { Room, Data } = require("../models/index.js");
module.exports = {
  async createRoom(userData, dataHistory) {
    try {
      const newRoom = await Room.create(
        { ...userData, Data: dataHistory },
        { include: { model: Data }, transaction }
      );
      return { newRoom, Data };
    } catch (error) {
      await transaction.rollback();
      throw new Error(error);
    }
  },
};
