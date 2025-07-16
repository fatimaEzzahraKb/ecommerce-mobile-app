 const {sequelize} = require("../config/db");
 const {DataTypes} = require("sequelize");
const User = require("./Users.model");


 const Message = sequelize.define("messages", {
   id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
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
     content:{
      type: DataTypes.TEXT,allowNull:false
     },
     type:{
       type: DataTypes.ENUM("message","answer"), allowNull: false,
     }

 })




 // sequelize.sync().then(()=>console.log("Table pivot bien crée"))
 //                  .catch((error)=>console.log("Unable to create table",error))


 module.exports = Message;