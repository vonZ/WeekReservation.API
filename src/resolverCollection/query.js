module.exports = {
  Query: {
    reservation: async (_, { id }, { dataSources }) =>
      Promise.resolve(dataSources.reservationAPI.getReservationById({ id })),
    customer: async (_, { id }, { dataSources }) =>
      Promise.resolve(dataSources.customerAPI.getCustomerById({ id })),
    getAllUsers: async (_, __, { dataSources }) =>
      Promise.resolve(dataSources.userAPI.getAllUsers()),
    getAllCustomers: async (_, __, { dataSources }) => {
      const getCustomers = async () =>
        Promise.resolve(dataSources.customerAPI.getAllCustomers());

      const getReservations = async id =>
        Promise.resolve(dataSources.customerAPI.getReservationByCustomerId(id));

      // const getReservations = id =>
      //   dataSources.customerAPI.getReservationByCustomerId(id);

      const objectToReturn = () =>
        getCustomers().then(data =>
          Promise.all(
            data.map(async item => {
              const reservations = await getReservations(item.id);

              return { item, reservations };
            })
          )
        );

      const res = objectToReturn().then(node => console.log(node));

      // const nodes = nrOfReservations().then(item => console.log(item));

      return Promise.resolve(dataSources.customerAPI.getAllCustomers());
    },
    getAllRoomTypes: async (_, __, { dataSources }) =>
      Promise.resolve(dataSources.reservationAPI.getAllRoomTypes()),
    getAllReservations: async (_, __, { dataSources }) =>
      Promise.resolve(dataSources.reservationAPI.getAllReservations()),
    getReservationIdsByUser: async (_, { userId }, { dataSources }) =>
      Promise.resolve(dataSources.userAPI.getReservationIdsByUser({ userId }))
  }
};
