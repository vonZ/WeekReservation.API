const { DataSource } = require("apollo-datasource");

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
      .then(slot => slot);

    return found && found.length ? found : [];
  }

  async findOrCreateSlot(slot) {
    const res = await this.store.slots.findOrCreate({
      where: { ...slot }
    });
    return res && res.length ? res[0].get() : false;
  }
}

module.exports = SlotAPI;
