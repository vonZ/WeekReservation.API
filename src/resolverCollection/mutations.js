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
    }
  }
};
