const redis = require("../config/redis");
const {Book_Copy, Book} = require("../models/index.model");


async function startScan(req, res) {
 try {
  const device_id = req.body.device_id;
  const book_id = parseInt(req.body.book_id);
  await redis.set(`device:${device_id}:book`, book_id);
  await redis.expire(`device:${device_id}:book`, 600);
  res.status(200).json({message:"You can start scanning"});
 }
 catch (error) {
  console.log(error)
  res.status(500).json({message:"Server error", error:error});
 }
}
async function endScan(req,res){
 try{
  const {device_id} = req.body;

  if(!device_id){
   return res.status(400).json({message:"aucune appareil n'est sélectionné"});
  }
  await redis.del(`device:${device_id}:book`);
  return res.status(200).json({message:"Appareil déconnecté !"});
 }
 catch(err){
  console.log(err);
   return res.status(500).json({message:"Erreur ",err});
 }
}
async function storeCopy(req,res) {
 try{
  const {uid,device_id} = req.body;
  if( !uid || !device_id){
   return res.status(400).json({message:"Device Id et UID sont obligatoire"});
  }
  const book_id =  await redis.get(`device:${device_id}:book`);
  if(!book_id){
   return res.status(404).json({message:'Aucun livre est assigné à cet appareil'});
  }

  const copy =  await Book_Copy.create({uid:uid,book_id:book_id});
  const book = await Book.findOne({id:book_id});
  book.quantite = book.quantite +1;
  await book.save();
  res.status(201).json({message:"Exemplaire stocké avec succès",copy})
 }
 catch(err){
  console.log("Error While Storing the Copy: ",err)
  res.status(500).json({error:err});
 }
}

module.exports ={startScan,storeCopy,endScan};