const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const OrderItem = sequelize.define("OrderItem", {
 id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
 order_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: "Orders", key: "id" }, onDelete: "CASCADE", onUpdate: "CASCADE" },
 book_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: "Books", key: "id" }, onDelete: "CASCADE", onUpdate: "CASCADE" },
 quantity: { type: DataTypes.INTEGER, allowNull: false },
 total: { type: DataTypes.FLOAT }
})


module.exports =OrderItem;
