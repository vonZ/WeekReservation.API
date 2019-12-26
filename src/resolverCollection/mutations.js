module.exports = {
  Mutation: {
    createUser: async (_, { name, phoneNumber, email }, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateUser({
        name,
        phoneNumber,
        email
      });
      if (user) return new Buffer(email).toString("base64");
    },
    makeReservation: async (_, reservation, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateReservation(
        reservation
      );

      const reservations = await dataSources.reservationAPI.getAllReservations();

      return {
        success: !!user,
        message: "Reservation added successfully",
        reservations
      };
    },
    deleteReservationById: async (_, id, { dataSources }) => {
      const reservation = await dataSources.reservationAPI.findAndDeleteReservation(
        id
      );

      const reservations = await dataSources.reservationAPI.getAllReservations();

      return {
        success: !!reservation,
        message: "Reservation removed successfully",
        reservations
      };
    }
  }
};
