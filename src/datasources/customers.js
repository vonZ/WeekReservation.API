const { DataSource } = require("apollo-datasource");

class CustomerAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async findOrCreateCustomer({ firstName, lastName, email, phoneNumber } = {}) {
    if (!firstName || !lastName || !email || !phoneNumber) return null;

    const customers = await this.store.customers.findOrCreate({
      where: { firstName, lastName, phoneNumber, email }
    });

    return customers && customers[0] ? customers[0] : null;
  }

  async getReservationByCustomerId({ customerId }) {
    if (!customerId) return null;

    const reservations = await this.store.reservations.findAll({
      where: { customerId }
    });
    return reservations && reservations[0] ? reservations : null;
  }

  async getCustomerById({ id }) {
    if (!id) return null;

    const customer = await this.store.customers.findAll({
      where: { id }
    });

    return customer && customer[0] ? customer[0] : null;
  }

  async getAllCustomers() {
    const found = await this.store.customers
      .findAll({
        include: [
          {
            model: this.store.reservations,
            as: "reservations"
          }
        ]
      })
      .then(costumers => costumers);

    return found && found.length ? found : [];
  }
}

module.exports = CustomerAPI;
