module.exports = {
  isBetweenDates: (dateFrom, dateTo, dateCheck) => {
    console.log({ dateFrom });
    console.log({ dateTo });
    console.log({ dateCheck });

    const fDate = Date.parse(dateFrom.split("T")[0]);
    const lDate = Date.parse(dateTo.split("T")[0]);
    const cDate = Date.parse(dateCheck.split("T")[0]);

    return cDate <= lDate && cDate >= fDate;
  },

  setOccupationStatus: slotsLeft => {
    if (slotsLeft === 0) return 1;
    else if (slotsLeft > 0 && slotsLeft < 3) return 2;
    else if (slotsLeft > 0) return 3;
  },

  months_sv: [
    "Januari",
    "Februari",
    "Mars",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "Augusti",
    "September",
    "Oktober",
    "November",
    "December"
  ]
};
