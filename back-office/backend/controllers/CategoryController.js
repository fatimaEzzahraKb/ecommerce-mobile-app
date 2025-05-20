const Category = require('../models/Category.model');
const Book = require('../models/Books.model');
const Order = require('../models/Order.model');


async function getCategories(req,res) {
 try{
  const categories =await Category.findAll({
    include: {
      model: Book,
      as: 'books',
      attributes: ['id', 'auteur', 'titre', 'description', 'prix'] ,
      through: {attributes: []},
      include:{
        model:Order,
        attributes:[]
      }
    }
  });
  res.status(200).json({categories});
  console.log(categories)
 }
 catch(error){
  console.log("Error while getting categories:ers",error)
 }
}



async function addCategory(req,res){
 try{
  const nom= req.body.nom;
  const descripiton = req.body.descripiton;
  const category = await Category.create({
   nom,descripiton
  })

  return res.status(201).json({message:"Catgeory created successfully ", category});
 }
 catch(err){
  console.log("Erreur lors de création du categorie ",err);
  if (err.name === "SequelizeValidationError") {
      const errors = err.errors.map((e) => ({
        field: e.path,
        message: e.message,
      }));
      return res.status(422).json({ errors });
    }

    if (err.name === "SequelizeUniqueConstraintError") {
      const errors = err.errors.map((e) => ({
        field: e.path,
        message: "Cette catégorie existe déjà.",
      }));
      return res.status(422).json({ errors });
    }

  return res.status(500).json({err});
 }
}
async function deleteCategory(req,res){
 try{
  const id = req.params.id;
  const category =await Category.findOne({where:{id}});
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
  const category = await Category.findOne({where:{id:id}});
  if(!category){
   res.status(404).send({message:"Category not found"});
  }
   category.nom = req.body.nom;
   category.description = req.body.description
   await category.save();
   return res.status(200).send({message:"La catégorie a été modifiée",cat:category}); 
 }
 catch (error) {
  if(error.name==="SequelizeUniqueConstraintError"){
    const errors = error.errors.map(e=>({field:e.path,message:"Ce nom existe déjà."}));
    return res.status(422).send({errors});
  }
  if(error.name==="SequelizeValidationError"){
    const errors = error.errors.map(e=>({field:e.path,message:e.message}));
    return res.status(422).send({errors});
  }
  console.log("Error while updatng Category",error);
  return res.status(500).send({error:error});
 }
}

module.exports={getCategories,addCategory,deleteCategory,updateCategory};
