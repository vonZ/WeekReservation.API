const SQL = require("sequelize");
const path = require("path");

module.exports.createStore = () => {
  const Op = SQL.Op;
  const operatorsAliases = {
    $in: Op.in
  };

  const db = new SQL("database", "username", "password", {
    dialect: "sqlite",
    storage: path.resolve(__dirname, "../store.sqlite"),
    operatorsAliases,
    logging: false
  });

  const users = db.define("user", {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    name: SQL.STRING,
    phoneNumber: SQL.INTEGER,
    email: SQL.STRING,
    token: SQL.STRING
  });

  const customers = db.define("customer", {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    firstName: SQL.STRING,
    lastName: SQL.STRING,
    phoneNumber: SQL.INTEGER,
    email: SQL.STRING,
    token: SQL.STRING
  });

  const reservations = db.define("reservation", {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    customerId: SQL.INTEGER,
    fromDate: SQL.DATEONLY,
    toDate: SQL.DATEONLY,
    comment: SQL.STRING,
    transportType: SQL.STRING,
    nrOfGuests: SQL.INTEGER,
    roomTypeId: SQL.INTEGER,
    payedInAdvanced: SQL.BOOLEAN,
    rentOveralls: SQL.BOOLEAN,
    slotId: SQL.INTEGER
  });

  const roomTypes = db.define("roomType", {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    name: SQL.STRING,
    mainImage: SQL.STRING,
    type: SQL.STRING,
    description: SQL.STRING,
    roomTypesAvailable: SQL.INTEGER,
    price: SQL.INTEGER
  });

  const slots = db.define("slot", {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    alias: SQL.STRING,
    fromDate: SQL.STRING,
    toDate: SQL.INTEGER,
    capacity: SQL.INTEGER
  });

  customers.hasMany(reservations);
  slots.hasMany(reservations);
  reservations.belongsTo(customers);
  reservations.belongsTo(slots);

  return { users, customers, reservations, roomTypes, slots };
};
