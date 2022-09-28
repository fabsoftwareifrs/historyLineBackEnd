const { HistoryData } = require("../models/index.js");
module.exports = {
  async storeHistory({ data, year, room_id }) {
    try {
      const storeHistorydata = await HistoryData.create(
        {
          data,
          year,
          room_id,
        },
        {
          include: [
            {
              model: HistoryData,
            },
          ],
        }
      );

      res.send({
        message: "Dado histórico criado com sucesso",
        data,
        year,
        room_id,
      });
    } catch (error) {
      res.send({ message: error });
    }
  },
};
