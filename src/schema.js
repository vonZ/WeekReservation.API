const { gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    reservation(id: ID!): Reservation
    customer(id: ID!): Customer
    getAllUsers: [User]
    getAllCustomers: [Customer]
    getReservationByCustomerId(customerId: ID!): [Reservation]
    getAllReservations: [Reservation]
    getAllRoomTypes: [Roomtypes]
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
    nrOfGuests: String
    roomType: Int
    payedInAdvanced: Boolean
    rentOveralls: Boolean
    customer: [Customer]
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
    nrOfReservations: Int
    reservations: [Reservation]
  }

  type Roomtypes {
    id: ID!
    name: String!
    mainImage: String
    roomType: String
    description: String
    roomTypesAvailable: Int
    price: Int
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
      nrOfGuests: Int
      roomType: Int
      payedInAdvanced: Boolean
      rentOveralls: Boolean
    ): ReservationUpdateResponse

    deleteReservationById(id: ID!): ReservationUpdateResponse!

    createRoomType(
      name: String
      mainImage: String
      roomType: String
      description: String
      roomTypesAvailable: Int
      price: Int
    ): RoomCreateResponse!
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

  type RoomCreateResponse {
    success: Boolean!
    message: String
    roomTypes: [Roomtypes]
  }
`;

module.exports = typeDefs;
