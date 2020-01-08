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

  async getReservationByCustomerId(customerId) {
    if (!customerId) return null;

    const reservations = await this.store.reservations.findAll({
      where: { customerId }
    });
    return reservations && reservations[0] ? reservations[0] : null;
  }

  async getCustomerById({ id }) {
    if (!id) return null;

    const customer = await this.store.customers.findAll({
      where: { id }
    });

    return customer && customer[0] ? customer[0] : null;
  }

  async iterateThroughCostumers(found) {
    if (!found) return null;

    const newArray = found;

    const functionWithPromise = item => Promise.resolve(item);

    const anAsyncFunction = async customer => {
      const reservationForCostumer = await this.getReservationByCustomerId(
        customer.id
      );
      const nrOfReservations =
        reservationForCostumer !== null ? [reservationForCostumer].length : 0;

      // const objectToReturn = {
      //   customer: {
      //     ...customer,
      //     dataValues: {
      //       ...customer.dataValues,
      //       nrOfReservations
      //     }
      //   }
      // };

      return Promise.resolve(nrOfReservations);
    };

    const getData = async () =>
      Promise.all(newArray.map(item => anAsyncFunction(item)));

    return getData().then(data => data);
  }

  async getAllCustomers() {
    const found = await this.store.customers.findAll();
    // const reservationCount = await this.iterateThroughCostumers(found);

    // newCostumers.map(item => console.log(item.dataValues));
    // found.map((item, index) => {
    //   const newObj = item.dataValues;
    //   newObj.nrOfReservations = reservationCount[index];
    //   return newObj;
    // });

    // newCostumers.map(item => [item.customer]);

    // console.log(found);

    return found && found.length ? found : [];
  }
}

module.exports = CustomerAPI;
