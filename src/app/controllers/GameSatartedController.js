const HttpResponse = require("../http/httpResponse");
const { Data } = require("../models");
module.exports = {
  async started(req, res) {
    const { room_id } = req.params;

    // Verifica se a sala exist e pega os dados da sala
    const dataHistory = await Data.findAll({
      where: { room_id },
      order: [["year", "ASC"]],
    });

    if (dataHistory.length === 0)
      return HttpResponse.badRequest(res, "Sala não encontrada");

    const diff = dataHistory[dataHistory.length - 1].year - dataHistory[0].year;

    // Cria um valor aleatorio entra 1 e a quantidade de dados
    const min = 1;
    const max = dataHistory.length - 2;
    const randomData = Math.floor(Math.random() * (max - min + 1)) + min;

    const dataSelect = [
      dataHistory[0],
      dataHistory[randomData],
      dataHistory[dataHistory.length - 1],
    ];

    // Percore os dados e adiciona o calculo de possição

    const dataFormatted = dataSelect.map(({ id, data, hint, year }, i) => {
      switch (id) {
        case dataHistory[0].id:
          return {
            id: i + 1,
            calcYear: 0,
            data: data,
            description: hint,
          };
        case dataHistory[dataHistory.length - 1].id:
          return {
            id: i + 1,
            calcYear: (year - dataSelect[i - 1].year) / diff,
            data: data,
            description: hint,
          };
        default:
          return {
            value: id,
            data: data,
            calcYear: (year - dataSelect[i - 1].year) / diff,
            hint: hint,
            answer: true,
          };
      }
    });
    HttpResponse.ok(res, dataFormatted);
  },
};
