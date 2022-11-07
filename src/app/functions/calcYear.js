module.exports = (...dataHistory) => {
  const diff = dataHistory[dataHistory.length - 1].year - dataHistory[0].year;

  const dataSelect = dataHistory;

  // Percore os dados e adiciona o calculo de possição

  const dataFormatted = dataSelect.map(({ id, year }, i) => {
    switch (id) {
      case dataHistory[0].id:
        return 0;
      case dataHistory[dataHistory.length - 1].id:
        return (year - dataSelect[i - 1].year) / diff;
      default:
        return (year - dataSelect[i - 1].year) / diff;
    }
  });
  return dataFormatted;
};
