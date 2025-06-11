const cartItems = require("../../../back-office/backend/models/cartItems.model");
const Book = require("../models/Books.model");

async function getUserCart(req,res){
 try{ 
  const id = parseInt(req.params.id);
  const cart_items = cartItems.findAll({
   where:{user_id:id},
   include:{
    model:Book,
    as:'books'
   }
  })
  return res.status(200).json({cart_items})
 }
 catch(err){
  console.log(err)
  return res.status(500).send("Erreur dans la récupération du panier",err)
 }
}