const { Order, User, Book, OrderItem } = require("../models/index.model");

async function addOrder(req, res) {
  try {
    const user_id = req.user.id;
    const { tel, ville, status, books, adress } = req.body;
    // books = [{ book_id: 1, quantity: 2 }, { book_id: 3, quantity: 1 }]

    let totalCommande = 0;
    const orderItemsData = [];

    for (const item of books) {
      const book = await Book.findByPk(item.book_id);
      if (!book) continue; // ignorer si le livre n'existe pas

      const itemTotal = item.quantity * book.prix;
      totalCommande += itemTotal;

      orderItemsData.push({
        book_id: item.book_id,
        quantity: item.quantity,
        total: itemTotal
      });
    }

    const order = await Order.create({ user_id, tel, ville, adress, status, total: totalCommande });

    orderItemsData.forEach(item => item.order_id = order.id); 

    await OrderItem.bulkCreate(orderItemsData);

    const user = await User.findByPk(user_id);

    res.status(201).send({
      message: "Votre commande a bien été envoyée",
      order,
      user_name: user.nom,
      user_surname: user.prenom,
    });

  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errorMessages = error.errors.map(err => err.message);
      return res.status(400).send({ message: "Validation failed", errors: errorMessages });
    }

    res.status(500).send({ message: "Erreur serveur", error: error.message });
  }
}



async function getOrders(req, res) {
  try {
    const userId = req.user.id;
    const orders = await Order.findAll({
      where: { user_id: userId }, 
      include: {
        model: User,
        attributes: ['id', 'nom', 'email', 'prenom', 'ville', 'pays']
      }
    });
    res.status(200).send({ orders: orders });
  } catch (error) {
    console.log("Erreur getOrders", error);
    res.status(500).send({ message: "Erreur serveur", error: error });
  }
}



module.exports = { addOrder, getOrders }