const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const SensorData = sequelize.define("SensorData", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    treeId: { type: DataTypes.INTEGER, allowNull: false },
    temperature: { type: DataTypes.FLOAT, allowNull: false },
    lightIntensity: { type: DataTypes.INTEGER, allowNull: false },
    soilMoisture: { type: DataTypes.INTEGER, allowNull: false },
    isRunning: { type: DataTypes.BOOLEAN, defaultValue: false },
});

module.exports = SensorData;
