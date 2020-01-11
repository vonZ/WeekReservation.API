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
    createCustomer: async (
      _,
      { firstName, lastName, email, phoneNumber },
      { dataSources }
    ) => {
      const customer = await dataSources.customerAPI.findOrCreateCustomer({
        firstName,
        lastName,
        email,
        phoneNumber
      });
      return {
        success: !!customer,
        message: "Customer added successfully"
      };
    },
    makeReservation: async (_, reservation, { dataSources }) => {
      const reservationItem = await dataSources.reservationAPI.findOrCreateReservation(
        reservation
      );

      const reservations = await dataSources.reservationAPI.getAllReservations();

      return {
        success: !!reservationItem,
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
    },
    createRoomType: async (_, roomTypeData, { dataSources }) => {
      const roomType = await dataSources.reservationAPI.findOrCreateRoomType(
        roomTypeData
      );
      return {
        success: !!roomType,
        message: "Room type added successfully"
      };
    },
    createSlot: async (_, slotData, { dataSources }) => {
      const slot = await dataSources.slotAPI.findOrCreateSlot(slotData);
      return {
        success: !!slot,
        message: "Slot added successfully"
      };
    }
  }
};
