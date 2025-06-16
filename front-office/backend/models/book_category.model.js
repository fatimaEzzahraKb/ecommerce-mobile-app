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


Book_Category.belongsTo(Book, {foreignKey: 'book_id'});
Book_Category.belongsTo(Category, {foreignKey: 'category_id'});


// sequelize.sync().then(()=>console.log("Table pivot bien crée"))
//                  .catch((error)=>console.log("Unable to create table",error))


module.exports = Book_Category;