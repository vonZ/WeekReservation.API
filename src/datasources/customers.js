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

  async getAllCustomers() {
    const found = await this.store.customers.findAll();
    return found && found.length ? found : [];
  }
}

module.exports = CustomerAPI;
