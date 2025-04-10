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
})

User.beforeCreate(async(user,options)=>{
 const salt = await bcrypt.genSalt(10);
 user.mdp = await bcrypt.hash(user.mdp, salt);
})

sequelize.sync().then(()=>{
 console.log("User table created successfully!!")
}).catch((error)=>{
 console.log('Unable to create table',error)
})

module.exports = User;