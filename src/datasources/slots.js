const { DataSource } = require("apollo-datasource");
const {
  months_sv,
  setOccupationStatus,
  isBetweenDates
} = require("../utils/helper");

class SlotAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async getAllSlots() {
    const found = await this.store.slots
      .findAll({
        include: [
          {
            model: this.store.reservations,
            as: "reservations"
          }
        ]
      })
      .then(slot =>
        slot.map(item => {
          const fromDate = new Date(item.fromDate);
          const slotsLeft = item.capacity - item.reservations.length;

          return {
            ...item.dataValues,
            month: months_sv[fromDate.getMonth()],
            occupationStatusCode: setOccupationStatus(slotsLeft)
          };
        })
      );

    return found && found.length ? found : [];
  }

  async findOrCreateSlot(slot) {
    const res = await this.store.slots.findOrCreate({
      where: { ...slot }
    });
    return res && res.length ? res[0].get() : false;
  }

  async getSlotByDateSpan({ fromDate, toDate }) {
    if (!fromDate || !toDate) return null;

    const slots = await this.store.slots.findAll();

    const slotList =
      slots.filter(
        item =>
          isBetweenDates(fromDate, toDate, item.fromDate) &&
          isBetweenDates(fromDate, toDate, item.toDate)
      ) || {};

    return slotList && slotList.length ? slotList : [];
  }
}

module.exports = SlotAPI;
