const { Data } = require("../models");
module.exports = {
  async started(req, res) {
    const { room_id } = req.params;
    const room = await Data.findAll({
      where: {
        room_id,
      },
      order: [["year", "ASC"]],
    });
    if (!room) {
      return res.json({ message: "Sala não encontrada" }).status(501);
    }
    const dataFormated = room.map((e, i) => {
      const verifyExist = room[i - 1];
      if (verifyExist) {
        return {
          dica: e.data,
          year: e.year,
          calcYear:
            100 *
            ((e.year * verifyExist.year) /
              (room[room.length - 1].year - room[0].year)),
        };
      }
      return {
        dica: e.data,
        year: e.year,
        calcYear: 0,
      };
    });
    res.json(dataFormated);
  },
};
