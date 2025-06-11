const {sequelize} = require("../config/db");
const {DataTypes} = require("sequelize");
const Book = require("./Books.model");
const Category = require("./Category.model");

const Book_Category = sequelize.define("bookCategories", {
    book_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Books',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Categories',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }

})

Book.belongsToMany(Category, {through: Book_Category, foreignKey: 'book_id', otherKey: 'category_id', as: 'categories'});
Category.belongsToMany(Book, {through: Book_Category, foreignKey: 'category_id', otherKey: 'book_id', as: 'books'});

Book_Category.belongsTo(Book, {foreignKey: 'book_id'});
Book_Category.belongsTo(Category, {foreignKey: 'category_id'});


// sequelize.sync().then(()=>console.log("Table pivot bien crée"))
//                 .catch((error)=>console.log("Unable to create table",error))


module.exports = Book_Category;