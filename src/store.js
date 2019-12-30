const SQL = require("sequelize");

module.exports.createStore = () => {
  const Op = SQL.Op;
  const operatorsAliases = {
    $in: Op.in
  };

  const db = new SQL("database", "username", "password", {
    dialect: "sqlite",
    storage: "./store.sqlite",
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
    payedInAdvanced: SQL.BOOLEAN,
    rentOveralls: SQL.BOOLEAN
  });

  return { users, customers, reservations };
};
