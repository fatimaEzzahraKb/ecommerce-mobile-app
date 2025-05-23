const Order = require("../models/Order.model");
const User = require("../models/Users.model");


async function getData(req,res) {
 try{
  const customersTotal = await User.count({where:{isAdmin:false}});
  const salesTotal = await Order.sum("total",{where:{status:'términé'}}) | 0;
  return res.status(200).send({customersTotal,salesTotal});
 }
 catch(err){
  console.log("Dashboard Data Error",err);
  return res.status(500).send(err);
 } 
}


module.exports = {getData}