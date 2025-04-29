const {Sequelize} = require("sequelize");

const sequelize = new Sequelize(
 process.env.DB_NAME,
 process.env.DB_USERNAME,
 process.env.DB_PASSWORD,{
  host:process.env.DB_HOST,
  dialect:process.env.DB_DIALECT,
  port:process.env.DB_PORT
 }
);
function initDb(){
 sequelize.authenticate()
 .then(()=>{
  console.log("Connexion à la DB réussite");
return sequelize.sync({alter:true});
})
.catch((error)=>console.log("Echec de connexion:",error))
};

module.exports = {sequelize, initDb}