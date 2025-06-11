const Book = require('../models/Books.model');
const Category = require('../models/Category.model');
const { get } = require('../routes');



async function getBooks(req, res) {
 try {
  const books = await Book.findAll({
   include: {
    model: Category,
    as: 'categories',
    attributes: ['id', 'nom'],
    through: { attributes: [] }
   }
  });

  res.status(200).json({
   message: "Liste des livres récupérée avec succès",
   books
  });
 } catch (error) {
  console.log(error);
  res.status(500).json({ error: "Erreur lors de la récupération des livres" });
 }
}

async function showBook(req, res) {
 try {
  const id = parseInt(res.params.id);
  const book = await Book.findAll({
   where: { id: id },
   include: {
    model: Category,
    as: 'categories',
    attributes: ['id', 'nom'],
    through: { attributes: [] }
   }
  });
if(!book){
  return res.status(404).json({message:'Livre non trouvé'})
 
}
  return res.status(200).json({
   message: "Liste des livres récupérée avec succès",
   book
  });
 } catch (error) {
  console.log(error);
  res.status(500).json({ error: "Erreur lors de la récupération du livre" });
 }
}



module.exports = { getBooks ,showBook};