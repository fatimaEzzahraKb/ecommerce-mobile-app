const {sequelize} = require("../config/db");
const {DataTypes} = require("sequelize");

const Book = sequelize.define("Books", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    titre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    auteur: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image:{
        type: DataTypes.STRING,
        allowNull: false
    },
    prix:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
},{
    tableName:"Books"
})



module.exports = Book;

