const {sequelize} = require("../config/db");
const {DataTypes} = require("sequelize");


const Category = sequelize.define("Categories",{
 id:{type:DataTypes.INTEGER, allowNull:false,primaryKey:true,autoIncrement:true},
 nom:{type:DataTypes.STRING, allowNull:false,unique:true}
})



module.exports = Category;