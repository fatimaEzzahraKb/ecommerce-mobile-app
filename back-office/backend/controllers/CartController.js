const cartItems = require("../models/cartItems.model");
const Book = require("../models/Books.model");
const User = require("../models/Users.model");
const Category = require("../models/Category.model");

async function addToCart(req, res) {
    try {
        const user_id = req.user.id;
        const { book_id, quantite } = req.body;

        const user = await User.findByPk(user_id);
        const book = await Book.findByPk(book_id);

        if (!user || !book) {
            return res.status(404).json({ message: "Utilisateur ou Livre introuvable" });
        }

        const existingItem = await cartItems.findOne({
            where: { user_id, book_id }
        });

        if (existingItem) {
            existingItem.quantite = parseInt(quantite);
            await existingItem.save();
        } else {
            await cartItems.create({ user_id, book_id, quantite });
        }

        res.status(200).json({ message: "Livre ajouté au panier avec succès" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de l'ajout au panier" });
    }
}



async function getAllUsersWithCart(req, res) {
    try {
        const users = await User.findAll({
            include: {
                model: Book,
                as: 'books',
                include: {
                    model: Category,
                    as: 'categories',
                    attributes: ['nom']
                },
                through: {
                    attributes: ['quantite']
                }
            }
        });

        res.status(200).json({ cartItems: users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération des paniers" });
    }
}



async function getUserCart(req, res) {
    const { user_id } = req.params;
    try {
        const user = await User.findByPk(user_id, {
            include: {
                model: Book,
                as: 'books',
                through: {
                    attributes: ["quantite"]
                }
            }
        });

        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }

        res.status(200).json({ "cartItems": user })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la récupération du panier" });
    }
}

async function removeBookFromCart(req, res) {
    const { user_id, book_id } = req.params;

    try {
        const deleted = await cartItems.destroy({
            where: { user_id, book_id }
        });

        if (deleted === 0) {
            return res.status(404).json({ message: "Relation non trouvé" });
        }

        res.status(200).json({ message: "Livre retiré du panier avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la suppresssion" })
    }
}

module.exports = { addToCart, getUserCart, removeBookFromCart, getAllUsersWithCart }