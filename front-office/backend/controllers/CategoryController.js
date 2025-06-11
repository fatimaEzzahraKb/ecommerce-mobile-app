const Book = require("../models/Books.model");
const Category = require("../models/Category.model");

async function getBooksByCategory(req, res) {
 try {
  const category = await Category.findAll({
   include: {
    model: Book,
    as: 'books',
   }
  });

  res.status(200).json({
   message: "Liste des livres récupérée avec succès",
   category
  });
 } catch (error) {
  console.log(error);
  res.status(500).json({ error: "Erreur lors de la récupération des livres" });
 }
}

module.exports = {getBooksByCategory}