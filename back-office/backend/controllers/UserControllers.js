const User = require('../models/Users.model');

async function getUsers(req,res) {
 try{
  const users =await User.findAll();
  res.status(200).json({users});
  console.log(users)
 }
 catch(error){
  console.log("Error while getting users",error)
 }
}
module.exports={getUsers};