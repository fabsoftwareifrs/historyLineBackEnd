const { Data } = require("../models");
module.exports = {
  async started(req, res) {
    const { room_id } = req.params;
    const room = await Data.findAll({
      where: { room_id},
      order: [["year", "ASC"]],
    });
    if (!room) return res.json({ message: "Sala não encontrada" }).status(501);
    
    const diff = room[room.length -1].year - room[0].year;
    
    const dataFormated = room.map(({data, year}, i) => {
      const verifyExist = room[i - 1];

      return {
        dica: data,
        year,
        calcYear: !verifyExist ? 0 : 100 * ((year * verifyExist.year) / diff),
      };
    });

    res.json(dataFormated);
  },
};
