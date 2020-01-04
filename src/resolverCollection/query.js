module.exports = {
  Query: {
    reservation: async (_, { id }, { dataSources }) =>
      Promise.resolve(dataSources.reservationAPI.getReservationById({ id })),
    customer: async (_, { id }, { dataSources }) =>
      Promise.resolve(dataSources.customerAPI.getCustomerById({ id })),
    getAllUsers: async (_, __, { dataSources }) =>
      Promise.resolve(dataSources.userAPI.getAllUsers()),
    getAllCustomers: async (_, __, { dataSources }) =>
      Promise.resolve(dataSources.customerAPI.getAllCustomers()),
    getAllRoomTypes: async (_, __, { dataSources }) =>
      Promise.resolve(dataSources.reservationAPI.getAllRoomTypes()),
    getAllReservations: async (_, __, { dataSources }) =>
      Promise.resolve(dataSources.reservationAPI.getAllReservations()),
    getReservationIdsByUser: async (_, { userId }, { dataSources }) =>
      Promise.resolve(dataSources.userAPI.getReservationIdsByUser({ userId }))
  }
};
