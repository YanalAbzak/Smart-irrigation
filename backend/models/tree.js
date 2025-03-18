const { DataTypes } = require("sequelize");
const sequelize = require("../config/config");

const Tree = sequelize.define("Tree", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    plantId: { type: DataTypes.INTEGER, allowNull: false },
    plantingDate: { type: DataTypes.DATEONLY, allowNull: false },
});

module.exports = Tree;
