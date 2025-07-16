const redis = require("../config/redis");
const Historique_Ventes = require("../models/historique_ventes.model");
const { Book_Copy, Book } = require("../models/index.model");

let lastScannedUID = null;

async function startScan(req, res) {
  try {
    const device_id = req.body.device_id;
    const book_id = parseInt(req.body.book_id);
    await redis.set(`device:${device_id}:book`, book_id);
    await redis.expire(`device:${device_id}:book`, 600);
    res.status(200).json({ message: "You can start scanning" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error });
  }
}

async function endScan(req, res) {
  try {
    const { device_id } = req.body;

    if (!device_id) {
      return res.status(400).json({ message: "aucune appareil n'est sélectionné" });
    }
    await redis.del(`device:${device_id}:book`);
    return res.status(200).json({ message: "Appareil déconnecté !" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Erreur ", err });
  }
}

async function storeCopy(req, res) {
  try {
    const { uid, device_id } = req.body;
    if (!uid || !device_id) {
      return res.status(400).json({ message: "Device Id et UID sont obligatoire" });
    }

    const book_id = await redis.get(`device:${device_id}:book`);
    if (!book_id) {
      return res.status(404).json({ message: 'Aucun livre est assigné à cet appareil' });
    }

    const copy = await Book_Copy.create({ uid: uid, book_id: book_id });

    const book = await Book.findOne({ where: { id: book_id } });
    if (!book) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }

    book.quantite = (book.quantite || 0) + 1;
    await book.save();

    res.status(201).json({ message: "Exemplaire stocké avec succès", copy });
  } catch (err) {
    console.log("Error While Storing the Copy: ", err);
    res.status(500).json({ error: err });
  }
}

async function supprimerExemplaire(req, res) {
  try {
    const { uid } = req.body;

    if (!uid) return res.status(400).json({ message: "UID est obligatoire" });

    const copy = await Book_Copy.findOne({ where: { uid } });
    if (!copy) return res.status(404).json({ message: "Aucune copie trouvée avec cet UID" });

    const book = await Book.findOne({ where: { id: copy.book_id } });
    if (!book) return res.status(404).json({ message: "Livre associé introuvable" });

    await Historique_Ventes.create({
      uid: copy.uid,
      book_id: copy.book_id,
      suppression_date: new Date()
    })

    book.quantite = Math.max((book.quantite || 0) - 1, 0);
    await book.save();

    await copy.destroy();

    return res.status(200).json({ message: "Exemplaire supprimé avec succès" });

  } catch (err) {
    console.error("Erreur dans supprimerExemplaire:", err);
    return res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
}

async function getHistory(req, res) {
  try {
    const history = await Historique_Ventes.findAll({
      order: [['suppression_date', 'DESC']],
      include: [{
        model: Book,
        as: 'book', // Assure-toi que l'alias correspond à ta relation dans le modèle Historique_Ventes
        attributes: ['id', 'titre', 'auteur', 'prix'] // Sélectionne ici les champs que tu veux récupérer
      }]
    });

    res.status(200).json({
      message: "L'historique de ventes est récupérée avec succès",
      history
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erreur lors de la récupération des livres" });
  }
}


module.exports = {
  startScan,
  storeCopy,
  endScan,
  supprimerExemplaire,
  getHistory
};
