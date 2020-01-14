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
      const slots = await dataSources.slotAPI.getAllSlots();

      const isBetweenDates = (dateFrom, dateTo, dateCheck) => {
        const d1 = dateFrom.split("-");
        const d2 = dateTo.split("-");
        const c = dateCheck.split("-");

        const from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]); // -1 because months are from 0 to 11
        const to = new Date(d2[2], parseInt(d2[1]) - 1, d2[0]);
        const check = new Date(c[2], parseInt(c[1]) - 1, c[0]);

        return (
          (check >= from && check <= to) ||
          check.toString() === to.toString() ||
          check.toString() === from.toString()
        );
      };

      const fromDateIsBetweenSlot =
        slots.find(item =>
          isBetweenDates(item.fromDate, item.toDate, reservation.fromDate)
        ) || {};

      const toDateIsBetweenSlot =
        slots.find(item =>
          isBetweenDates(item.fromDate, item.toDate, reservation.toDate)
        ) || {};

      const found = fromDateIsBetweenSlot ? fromDateIsBetweenSlot : {};

      const { dataValues: { id = 0 } = {} } = found;

      console.log(found);

      if (id === 0) {
        const reservations = await dataSources.reservationAPI.getAllReservations();

        return {
          success: false,
          message: "The choosen dates isn't between any slot",
          reservations
        };
      } else {
        const newItem = {
          ...reservation,
          slotId: id
        };

        const reservationItem = await dataSources.reservationAPI.findOrCreateReservation(
          newItem
        );

        const reservations = await dataSources.reservationAPI.getAllReservations();

        return {
          success: !!reservationItem,
          message: "Reservation added successfully",
          reservations
        };
      }
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

      const slots = await dataSources.slotAPI.getAllSlots();

      return {
        success: !!slot,
        message: "Slot added successfully",
        slots
      };
    }
  }
};
