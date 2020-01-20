module.exports = {
  isBetweenDates: (dateFrom, dateTo, dateCheck) => {
    const d1 = dateFrom.split("-");
    const d2 = dateTo.split("-");
    const c = dateCheck.split("-");

    const from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]); // -1 because months are from 0 to 11
    const to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
    const check = new Date(c[2], parseInt(c[1]) - 1, c[0]);

    return (
      (check >= from && check <= to) ||
      check.toString() === to.toString() ||
      check.toString() === from.toString()
    );
  }
};
