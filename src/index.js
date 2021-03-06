const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const { createStore } = require("./store");
const resolvers = require("./resolverCollection");

const ReservationAPI = require("./datasources/reservations");
const UserAPI = require("./datasources/user");
const CustomerAPI = require("./datasources/customers");
const SlotAPI = require("./datasources/slots");
const store = createStore();
const isEmail = require("isemail");

const server = new ApolloServer({
  context: async ({ req }) => {
    // simple auth check on every request
    const auth = (req.headers && req.headers.authorization) || "";
    const email = Buffer.from(auth, "base64").toString("ascii");
    if (!isEmail.validate(email)) return { user: null };
    // find a user by their email
    const users = await store.users.findOrCreate({ where: { email } });
    const user = (users && users[0]) || null;

    return { user: { ...user.dataValues } };
  },
  typeDefs,
  resolvers,
  dataSources: () => ({
    reservationAPI: new ReservationAPI({ store }),
    customerAPI: new CustomerAPI({ store }),
    userAPI: new UserAPI({ store }),
    slotAPI: new SlotAPI({ store }),
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
