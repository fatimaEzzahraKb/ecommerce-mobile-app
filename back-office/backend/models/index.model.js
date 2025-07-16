const { sequelize } = require('../config/db');
const User = require('./Users.model');
const Category = require('./Category.model');
const Order = require('./Order.model');
const OrderItem = require("./OrderItem.model");
const Book = require("./Books.model");
const Book_Category = require('./book_category.model');
const Book_Copy = require('./book_copy');
const Historique_Ventes = require('./historique_ventes.model');
User.hasMany(Order, { foreignKey: "user_id" });
Order.belongsTo(User, { foreignKey: "user_id" });

OrderItem.belongsTo(Book, { foreignKey: 'book_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

Order.belongsToMany(Book,{through:OrderItem,foreignKey:"order_id",otherKey:"book_id"});
Book.belongsToMany(Order,{through:OrderItem,foreignKey:"book_id",otherKey:"order_id"});

Category.belongsToMany(Book,{through:Book_Category,foreignKey:"category_id",otherKey:"book_id"});
Book.belongsToMany(Category,{through:Book_Category,foreignKey:"book_id",otherKey:"category_id"});

Book.hasMany(Book_Copy,{foreignKey:"book_id"});
Book_Copy.belongsTo(Book,{foreignKey:"book_id"});

Book.hasMany(Historique_Ventes,{foreignKey:"book_id", as:"book"});
Historique_Ventes.belongsTo(Book,{foreignKey:"book_id", as:"book"});

module.exports = {
  sequelize,
  User,
  Category,
  Order,
  Book,
  OrderItem,
  Book_Copy,
  Historique_Ventes
};