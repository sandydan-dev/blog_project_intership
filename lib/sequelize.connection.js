const { Sequelize } = require("sequelize");
const config =
  require("../config/config")[process.env.NODE_ENV || "development" || "test"];
// const dotenv = require("dotenv");
// dotenv.config();

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    logging: config.logging,
  }
);

module.exports = sequelize;
