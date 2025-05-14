const {sequelize} = require("../config/db");
const {DataTypes} = require("sequelize");
const bcrypt = require('bcryptjs')

const User = sequelize.define("Users",{
 id:{type:DataTypes.INTEGER, allowNull:false,primaryKey:true,autoIncrement:true},
 nom:{type:DataTypes.STRING, allowNull:false},
 prenom:{type:DataTypes.STRING,allowNull:false},
 email:{type:DataTypes.STRING,allowNull:false},
 mdp:{type:DataTypes.STRING,allowNull:false},
 isAdmin:{type:DataTypes.BOOLEAN,allowNull:false},
 ville:{type:DataTypes.STRING,allowNull:false,defaultValue:"Casablanca"},
 pays:{type:DataTypes.STRING,allowNull:false,defaultValue:"Maroc"}
})



module.exports = User;