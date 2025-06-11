const {sequelize} = require("../config/db.js");
const {DataTypes} = require("sequelize");

const User = require("./Users.model.js")
const Book = require("./Books.model.js")

const cartItems = sequelize.define("cartItems",{
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
            model: 'users',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'books',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
})

User.belongsToMany(Book, {through: cartItems, foreignKey: 'user_id', otherKey: 'book_id', as: 'books'});
Book.belongsToMany(User, {through: cartItems, foreignKey: 'book_id', otherKey: 'user_id', as: 'users'});

cartItems.belongsTo(User, {foreignKey: 'user_id'});
cartItems.belongsTo(Book, {foreignKey: 'book_id'});


sequelize.sync().then(()=> console.log("cartItems table created successfully"))
                .catch(()=>console.log("Unable to create table", error));

module.exports = cartItems;


