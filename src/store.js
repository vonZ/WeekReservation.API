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

  const reservations = db.define("reservation", {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    userId: SQL.INTEGER,
    fromDate: SQL.DATE,
    toDate: SQL.DATE,
    comment: SQL.STRING,
    transportType: SQL.STRING,
    payedInAdvanced: SQL.BOOLEAN,
    rentOveralls: SQL.BOOLEAN
  });

  return { users, reservations };
};
