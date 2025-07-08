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

    // Créer la commande avec le total calculé
    const order = await Order.create({ user_id, tel, ville, adress, status, total: totalCommande });

    // Ajouter commande_id aux orderItems
    orderItemsData.forEach(item => item.order_id = order.id); // ✅ correspond à ton modèle

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
    const orders = await Order.findAll({
      include: {
        model: User,
        attributes: ['id', 'nom', 'email', 'prenom', 'ville', 'pays']
      }
    });
    res.status(200).send({ orders: orders });
  }
  catch (error) {
    console.log("Error getting Orders", error)
    res.status(500).send({ message: "Erreur", error: error });
  }
}

async function getOrdersOfUser(req, res) {
  try {
    const userId = req.params.id;
    if (isNaN(userId)) {
      return res.status(400).send({ message: "Invalid user ID" });
    }
    const orders = await Order.findAll({
      where: { user_id: userId },
      include: { model: User, attributes: ['id', 'nom', 'prenom', 'email'] }
    });
    res.status(200).send(orders);
  }
  catch (error) {
    console.log("Error getting the Order", error)
    res.status(500).send({ message: "Erreur", error: error });
  }
}

async function showOrder(req, res) {
  try {
    const id = req.params.id
    const order = await Order.findOne({ where: { id }, include: [{ model: Book }, { model: User, attributes: ["id", "nom", "prenom", "email", "ville", "pays"] }] });
    if (!order) {
      res.status(404).send({ message: "Order not found" });
    }
    res.status(200).send({ order: order });
  }
  catch (error) {
    console.log("Error  showing Order", error)
    res.status(500).send({ message: "Erreur", error: error });
  }
}


async function updateOrder(req, res) {
  try {
    const id = req.params.id
    const updatedOrder = req.body
    const order = await Order.findOne({ where: { id } });
    if (!order) {
      res.status(404).json({ message: "Order not found" });
    }
    await order.update(updatedOrder);
    res.status(200).json({ order: order });
  }
  catch (error) {
    console.log("Error update Order", error)
    res.status(500).json({ message: "Erreur", error: error });
  }
}

async function updateOrderStatus(req, res) {
  try {
    const id = req.params.id
    const newStatus = req.body.status
    const order = await Order.findOne({ where: { id } });
    if (!order) {
      res.status(404).send({ message: "Order not found" });
    }
    await order.update({ status: newStatus });
    res.status(200).send({ message: "La commande a été bien modifié", order: order });
  }
  catch (error) {
    console.log("Error update status of the Order", error)
    res.status(500).send({ message: "Erreur", error: error });
  }
}


async function deleteOrder(req, res) {
  try {
    const id = req.params.id
    const order = await Order.findOne({ where: { id } });
    if (!order) {
      res.status(404).json({ message: "Order not found" });
    }
    await order.destroy();
    res.status(200).json("Commande a été bien supprimé");
  }
  catch (error) {
    console.log("Error deleting  Order", error)
    res.status(500).json({ message: "Erreur", error: error });
  }
}


async function getOrderById(req, res) {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['id', 'nom', 'prenom', 'email', 'ville', 'pays']
        },
        {
          model: Book,
          attributes: ['id', 'titre', 'prix','quantite','image'],
          through: {
            model: OrderItem,
            attributes: ['quantity','total']
          }
        }
      ]
    });

    if (!order) {
      return res.status(404).send({ message: "Commande non trouvée" });
    }

    res.send(order);
  } catch (error) {
    res.status(500).send({ message: "Erreur serveur", error: error.message });
  }
}

module.exports = { addOrder, getOrders, getOrdersOfUser, showOrder, updateOrder, updateOrderStatus, deleteOrder, getOrderById }