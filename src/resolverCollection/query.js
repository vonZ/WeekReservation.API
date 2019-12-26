module.exports = {
  Query: {
    reservation: async (_, { id }, { dataSources }) =>
      Promise.resolve(dataSources.reservationAPI.getReservationById({ id })),
    getAllUsers: async (_, __, { dataSources }) =>
      Promise.resolve(dataSources.userAPI.getAllUsers()),
    getAllReservations: async (_, __, { dataSources }) =>
      Promise.resolve(dataSources.reservationAPI.getAllReservations()),
    getReservationIdsByUser: async (_, { userId }, { dataSources }) =>
      Promise.resolve(dataSources.userAPI.getReservationIdsByUser({ userId }))
  }
};
