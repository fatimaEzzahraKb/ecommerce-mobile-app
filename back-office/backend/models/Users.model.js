const {sequelize} = require("../config/db");
const {DataTypes} = require("sequelize");
const bcrypt = require('bcryptjs')

const User = sequelize.define("Users",{
 id:{type:DataTypes.INTEGER, allowNull:false,primaryKey:true,autoIncrement:true},
 nom:{type:DataTypes.STRING, allowNull:false,
  validate:{
   notEmpty:{msg:"Le nom est obligatoire"}
  }},
 prenom:{type:DataTypes.STRING,allowNull:false,
  validate:{
   notEmpty:{msg:"Le prénom est obligatoire"}
  }},
 email:{type:DataTypes.STRING,allowNull:false,
  validate:{
   notEmpty:{msg:"L'email est obligatoire"},
   unique:{msg:"Cette email éxiste déjà"}
  }},
 mdp:{type:DataTypes.STRING,allowNull:false,
  validate:{
   notEmpty:{msg:"Le nom est obligatoire"}
  }},
 isAdmin:{type:DataTypes.BOOLEAN,allowNull:false},
 ville:{type:DataTypes.STRING,allowNull:false,defaultValue:"Casablanca",
  validate:{
   notEmpty:{msg:"La ville est obligatoire"}
  }},
 pays:{type:DataTypes.STRING,allowNull:false,defaultValue:"Maroc",
  validate:{
   notEmpty:{msg:"Le pays est obligatoire"}
  }}
})



module.exports = User;