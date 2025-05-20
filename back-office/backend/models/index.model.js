const { sequelize } = require('../config/db');
const User = require('./Users.model');
const Category = require('./Category.model');
const Order = require('./Order.model');
const OrderItem = require("./OrderItem.model");
const Book = require("./Books.model");
const Book_Category = require('./book_category.model');
User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });


Order.belongsToMany(Book,{through:OrderItem,foreignKey:"order_id",otherKey:"book_id"});
Book.belongsToMany(Order,{through:OrderItem,foreignKey:"book_id",otherKey:"order_id"});

Category.belongsToMany(Book,{through:Book_Category,foreignKey:"category_id",otherKey:"book_id"});
Book.belongsToMany(Category,{through:Book_Category,foreignKey:"book_id",otherKey:"category_id"});

module.exports = {
  sequelize,
  User,
  Category,
  Order,
  Book,
  OrderItem
};