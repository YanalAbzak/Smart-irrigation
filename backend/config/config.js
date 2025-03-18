require("dotenv").config();
const { Sequelize } = require("sequelize");

// Create a new Sequelize instance for database connection
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false, // Disable logging SQL queries in console
    }
);

module.exports = sequelize;
