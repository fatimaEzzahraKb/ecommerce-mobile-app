const Book = require('../models/Books.model');
const Category = require('../models/Category.model');

async function addBook(req, res) {
    const {titre, auteur, description, prix, categories} = req.body;
    const image = req.file ? req.file.filename : null;

    if (!image) {
        return res.status(400).json({ error: "L'image est obligatoire pour ajouter un livre" });
    }

    try {
        const book = await Book.create({
            titre,
            auteur,
            description,
            prix,
            image
        });

        if (categories && categories.length > 0) {
            await book.addCategories(categories);
        }

        res.status(201).json({message: "Livre ajouté avec succès"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Erreur lors de l'ajout du livre"});
    }

}

async function getBooks(req, res) {
    try {
        const books = await Book.findAll({
            include: {
                model: Category,
                as: 'categories',
                attributes: ['id', 'nom'],
                through: {attributes: []}
            }
        });

        res.status(200).json({
            message: "Liste des livres récupérée avec succès",
            books
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({error: "Erreur lors de la récupération des livres"});
    }
}

async function deleteBook(req, res) {

    const {id} = req.params;

    try {
        const book = await Book.findByPk(id);

        if (!book) {
            return res.status(404).json({ message: "Livre non trouvé" });
        }

        await book.destroy();

        res.status(200).json({message: "Livre supprimé avec succès"});
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Erreur lors de la suppression du livre"});
    }
}

async function updateBook(req, res) {
    const {id} = req.params;
    const {titre, auteur, description, prix, categories} = req.body;
    const image = req.file ? req.file.filename : null;

    try{
        const book = await Book.findByPk(id);
        
        if(!book) {
            return res.status(404).json({message: "Livre non trouvé"});
        }

        book.titre = titre || book.titre;
        book.auteur = auteur || book.auteur;
        book.description = description || book.description;
        book.prix = prix || book.prix;
        if (image) book.image = image;

        await book.save();

        if(categories && categories.length > 0) {
            await book.setCategories(categories);
        }

        res.status(200).json({message: "Livre mise à jour avec succés"});

    } catch(error) {
        console.log(error);
        res.status(500).json({error: "Erreur lors de la mise à jour du livre"});
    }
}


module.exports = {addBook, getBooks, deleteBook, updateBook};