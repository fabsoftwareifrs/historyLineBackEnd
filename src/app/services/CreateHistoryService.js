const { HistoryData } = require("../models/index.js");
module.exports = {
  async storeHistory({ data, year, room_id }) {
    const historyData = {
      data,
      year,
      room_id,
    };
    try {
      await HistoryData.create(historyData, {
        include: [{ model: HistoryData }],
      });
    } catch (error) {
      throw new Error(error);
    }
  },
};
