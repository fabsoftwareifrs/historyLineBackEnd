const { sequelize } = require("../models/index.js");
const { Room, Data } = require("../models/index.js");
module.exports = {
  async createRoom(userData, dataHistory) {
    const transaction = await sequelize.transaction();
    try {
      const newRoom = await Room.create(userData, { transaction });

      const formattedDataHistory = dataHistory.map(({ data, year }) => {
        return { data, year, room_id: newRoom.id };
      });

      await Data.bulkCreate(formattedDataHistory, {
        transaction,
      });

      await transaction.commit();
      return { newRoom, Data };
    } catch (error) {
      await transaction.rollback();
      throw new Error(error);
    }
  },
};
