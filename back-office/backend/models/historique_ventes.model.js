// models/Historique.js
const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const Historique_Ventes = sequelize.define('Historique_Ventes', {
  uid: { type: DataTypes.STRING, allowNull: false },
  book_id: { type: DataTypes.INTEGER, allowNull: false },
  suppression_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Historique_Ventes;
