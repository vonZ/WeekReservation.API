const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    reservation(id: ID!): Reservation
    getAllUsers: [User]
    getAllCustomers: [Customer]
    getAllReservations: [Reservation]
    getReservationIdsByUser(userId: ID!): Reservation
  }

  """
  Simple wrapper around our list of launches that contains a cursor to the
  last item in the list. Pass this cursor to the launches query to fetch results
  after these.
  """
  type ReservationConnection { # add this below the Query type as an additional type.
    reservations: [Reservation]!
  }

  type Reservation {
    id: Int!
    customerId: Int
    fromDate: String!
    toDate: String!
    comment: String
    transportType: String
    payedInAdvanced: Boolean
    rentOveralls: Boolean
  }

  type User {
    id: ID!
    email: String!
    name: String
    phoneNumber: Int
  }

  type Customer {
    id: ID!
    firstName: String!
    lastName: String
    email: String
    phoneNumber: String
  }

  type Mutation {
    # if false, booking trips failed -- check errors
    makeReservations(reservationIds: [ID]!): ReservationUpdateResponse!

    createUser(
      name: [String]
      phoneNumber: [Int]
      email: [String]
    ): UserUpdateResponse!

    createCustomer(
      firstName: String
      lastName: String
      email: String
      phoneNumber: String
    ): CustomerUpdateResponse!

    makeReservation(
      customerId: Int
      fromDate: String
      toDate: String
      comment: String
      transportType: String
      payedInAdvanced: Boolean
      rentOveralls: Boolean
    ): ReservationUpdateResponse

    deleteReservationById(id: ID!): ReservationUpdateResponse!
  }

  type ReservationUpdateResponse {
    success: Boolean!
    message: String
    reservations: [Reservation]
  }

  type UserUpdateResponse {
    success: Boolean!
    message: String
    user: [User]
  }

  type CustomerUpdateResponse {
    success: Boolean!
    message: String
    customer: [Customer]
  }
`;

module.exports = typeDefs;
