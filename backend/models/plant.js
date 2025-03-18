const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Plant = sequelize.define("Plant", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Plant;
