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
    const found = await this.store.reservations
      .findAll({
        include: [
          {
            model: this.store.customers,
            as: "customer"
          },
          { model: this.store.slots, as: "slot" }
        ]
      })
      .then(reservation => reservation);

    return found && found.length ? found : [];
  }

  async getAllRoomTypes() {
    const found = await this.store.roomTypes.findAll();
    return found && found.length ? found : [];
  }

  async findOrCreateReservation(reservation) {
    const res = await this.store.reservations.findOrCreate({
      where: { ...reservation }
    });
    return res && res.length ? res[0].get() : false;
  }

  async findOrCreateRoomType(roomTypeData) {
    const res = await this.store.roomTypes.findOrCreate({
      where: { ...roomTypeData }
    });
    return res && res.length ? res[0].get() : false;
  }

  async findAndDeleteReservation({ id }) {
    const res = await this.store.reservations.destroy({
      where: { id }
    });

    return "Deleted successfully";
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
