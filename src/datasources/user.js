const { DataSource } = require("apollo-datasource");
const isEmail = require("isemail");

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async findOrCreateUser({
    name: nameArg,
    phoneNumber: phoneNumberArg,
    email: emailArg
  } = {}) {
    const name =
      this.context && this.context.user
        ? this.context.user.name[0]
        : nameArg[0];

    const phoneNumber =
      this.context && this.context.user
        ? this.context.user.phoneNumber[0]
        : phoneNumberArg[0];

    const email =
      this.context && this.context.user
        ? this.context.user.email[0]
        : emailArg[0];

    if (!name || !phoneNumber || !email || !email) return null;

    const users = await this.store.users.findOrCreate({
      where: { name, phoneNumber, email }
    });

    return users && users[0] ? users[0] : null;
  }

  async findOrCreateReservation(reservation) {
    const res = await this.store.reservations.findOrCreate({
      where: { ...reservation }
    });
    return res && res.length ? res[0].get() : false;
  }

  async getReservationIdsByUser({ userId }) {
    const res = await this.store.reservations.findAll({
      where: { userId }
    });
    return res && res.length ? res.map(item => item[0].get()) : [];
  }

  async getAllUsers() {
    const found = await this.store.users.findAll();
    return found && found.length ? found : [];
  }
}

module.exports = UserAPI;
