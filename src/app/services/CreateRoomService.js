const { sequelize } = require("../models/index.js");
const { Room, Data } = require("../models/index.js");
module.exports = {
  async createRoom({ name, privater, user_id, data }) {
    const transaction = await sequelize.transaction();
    try {
      const newRoom = await Room.create(
        {
          name,
          privater,
          user_id,
        },
        {
          transaction,
        }
      );

      const formatedData = data.map((element) => {
        return { data: element.data, year: element.year, room_id: newRoom.id };
      });

      const newData = await Data.bulkCreate(formatedData, {
        transaction,
      });

      await transaction.commit();
      return newRoom;
    } catch (error) {
      await transaction.rollback();
      throw new Error(error);
    }
  },
};
