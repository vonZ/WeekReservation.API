const { DataSource } = require("apollo-datasource");

class ReservationAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async getAllReservations() {
    const found = await this.store.reservations.findAll();
    return found && found.length ? found : [];
  }

  async getReservationById({ id }) {
    const res = await this.store.reservations.findAll({
      where: { id }
    });

    return res && res.length ? res[0].get() : [];
  }

  getReservationsByIds({ launchIds }) {
    return Promise.all(
      launchIds.map(launchId => this.getReservationById({ launchId }))
    );
  }
}

module.exports = ReservationAPI;
