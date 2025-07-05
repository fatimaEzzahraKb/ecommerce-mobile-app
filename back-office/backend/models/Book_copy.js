const {sequelize} = require("../config/db");
const {DataTypes} = require("sequelize");

const Book_Copy = sequelize.define("bookCopies",{
 id:{
  type:DataTypes.INTEGER,
  autoIncrement:true,
  primaryKey:true,
  allowNull:false
 },
 uid:{
  type:DataTypes.STRING,
  unique:true,
  allowNull:false
 },
 book_id:{
  type:DataTypes.INTEGER,
  allowNull:false,
  references:{
   model:'Books',
   key:'id'
  },
  onDelete:'CASCADE',
  onUpdate:'CASCADE',
 }
})

module.exports = Book_Copy;