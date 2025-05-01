const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const Order = sequelize.define("Orders", {
 id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
 tel: { type: DataTypes.STRING, allowNull: false,validate: {
  notEmpty: { msg: "Telephone est obligatoire" },
  isNumeric: { msg: "Telephone foit avoir just des nombers" },
}
},
 ville: { type: DataTypes.STRING, allowNull: false ,validate: {
  notEmpty: { msg: "La ville est obligatoire" },
}},
 adress: { type: DataTypes.STRING, allowNull: false,validate: {
  notEmpty: { msg: "L'address est obligatoire" },
} },
 status: { type: DataTypes.ENUM("en cours", "términé", "annulé"), allowNull: false,defaultValue:"en cours",},
 total: { type: DataTypes.FLOAT, allowNull: false },
user_id:{type:DataTypes.INTEGER,allowNull:false,references:{model:"Users",key:"id"},onUpdate:"CASCADE",onDelete:"CASCADE"},
})

module.exports = Order;