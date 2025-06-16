const Book = require("../models/Books.model");
const Category = require("../models/Category.model");

async function getAllCategory(req, res) {
 try {
  const categories = await Category.findAll({
   include: {
    model: Book,
    as: 'books',
    include:{
     model:Category,
     as:'categories',
    attributes: ['id', 'nom'],
    }
   }
  });

  res.status(200).json({
   message: "Liste des livres récupérée avec succès",
   categories
  });
 } catch (error) {
  console.log(error);
  res.status(500).json({ error: "Erreur lors de la récupération des livres" });
 }
}

async function getCategoryBooks(req, res) {
 try {
  const id = req.params.id;
  const category_books = await Category.findOne({ id: id, include: { model: Book, as: 'books' } })
  if(!category_books){
   return res.status(404).json({message:'Category not found!'});
  }
  return res.status(200).json({message:'Categorie récupérée avec succès',category_books:category_books});
 }
 catch (e) {
  console.log(e);
  return res.status(500).json({message:'Un problème est sérvenue',error:e});
 }
}
module.exports = { getAllCategory,getCategoryBooks }