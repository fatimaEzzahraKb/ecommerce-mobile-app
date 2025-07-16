const {sequelize} = require("../config/db.js");
const {DataTypes} = require("sequelize");

const User = require("./Users.model.js")
const Book = require("./Books.model.js")

const CartItem = sequelize.define("cartItems",{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    quantite: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Book,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
})

User.belongsToMany(Book, {through: CartItem, foreignKey: 'user_id', otherKey: 'book_id', as: 'books'});
Book.belongsToMany(User, {through: CartItem, foreignKey: 'book_id', otherKey: 'user_id', as: 'users'});

CartItem.belongsTo(User, {foreignKey: 'user_id'});
CartItem.belongsTo(Book, {foreignKey: 'book_id'});


sequelize.sync().then(()=> console.log("CartItem table created successfully"))
                .catch(()=>console.log("Unable to create table", error));

module.exports = CartItem;


