const sequelize = require("../config");
const Plant = require("./plant");
const Tree = require("./tree");
const SensorData = require("./sensorData");

// Define relationships between models
Tree.belongsTo(Plant, { foreignKey: "plantId" });
SensorData.belongsTo(Tree, { foreignKey: "treeId" });

module.exports = { sequelize, Plant, Tree, SensorData };
