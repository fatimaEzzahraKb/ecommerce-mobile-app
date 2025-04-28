const Category = require('../models/Category.model');


async function getCategories(req,res) {
 try{
  const categories =await Category.findAll();
  res.status(200).json({categories});
  console.log(categories)
 }
 catch(error){
  console.log("Error while getting users",error)
 }
}



async function addCategory(req,res){
 try{
  const nom= req.body;
  const category = await Category.create({
   nom
  })

  res.status(201).json({message:"Catgeory created successfully ", category});
 }
 catch(error){
  console.log("Erreur lors de création du categorie ")
 }
}
async function deleteCategory(req,res){
 try{
  const id = req.params.id;
  const category =await Category.findOne({where:id});
  if(!category){
   return res.status(404).send({message:"Categgory Not Found"});
  }
  await category.destroy();
  res.status(200).send({message:"Category deleted successfully"});
 }
 catch(error){
  console.log("Error while deleteing Category",error);
  res.status(500).send({error:error})
 }
}
async function updateCategory(req,res){
 try{
  const id = req.params.id;
  const category = Category.findOne({where:id});
  if(!category){
   res.status(404).send({message:"Category not found"});
  }
  category.nom = req.body.nom;
  res.status(200).send({message:"Category has been updated successfully"});
 }
 catch(error){
  console.log("Error while updatng Category",error);
  res.status(500).send({error:error});
 }
}

module.exports={getCategories,addCategory,deleteCategory,updateCategory};
