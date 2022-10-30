const { Data } = require("../models");
module.exports = {
  async started(req, res) {
    const { room_id } = req.params;
    const room = await Data.findAll({
      where: { room_id },
      order: [["year", "ASC"]],
    });
    if (room.length === 0) return res.json({ message: "Sala não encontrada" }).status(501);

    const diff = room[room.length - 1].year - room[0].year;
    const possivel = room.filter((e) => {
      if (room[0].year !== e.year && room[room.length - 1].year !== e.year) {
        console.log(e.year);
        return e
      }
    })
    const positions = Math.floor(Math.random() * possivel.length);
    const yesrAnswer = possivel[positions].year;
    const dataFormated = []

    room.forEach(({ data, year, id }, i) => {
      if (room[0].year == year || room[room.length - 1].year == year) {
        const verifyExist = room[i - 1];
        return dataFormated.push({
          descricao: data,
          value: i,
          calcYear: !verifyExist ? 0 : 100 * ((year * verifyExist.year) / diff),
        })
      }
      if (year === yesrAnswer)
        return dataFormated.push({
          dica: data,
          value: i,
          retosta: true,
          index: id,
          calcYear: 123,
        })

    });

    res.json(dataFormated);
  },
};
