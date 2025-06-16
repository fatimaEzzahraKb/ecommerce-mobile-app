const {sequelize} = require("../config/db");
const {DataTypes} = require("sequelize");


const Category = sequelize.define("Category", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    nom: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: { msg: "Le nom est obligatoire" },
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: "Categories"
});

module.exports = Category;