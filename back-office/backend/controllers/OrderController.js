const { Order, User, Book } = require("../models/index.model");

async function addOrder(req, res) {
  try {
    const user_id = req.user.id;
    const data = { ...req.body, user_id }
    const order = await Order.create(data);
    const user = await User.findByPk(user_id);
    res.status(201).send({
      message: "Votre commande a bien été envoyée", order,
      user_name: user.nom,
      user_surname: user.prenom,
    });
  }
  catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errorMessages = error.errors.map(err => err.message);
      return res.status(400).send({ message: "Validation failed", errors: errorMessages });
    }

    res.status(500).send({ message: "Error", error: error.message });
  }
}

async function getOrders(req, res) {
  try {
    const orders = await Order.findAll({
      include: {
        model: User,
        attributes: ['id', 'nom', 'email','prenom','ville','pays']
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
    const order = await Order.findOne({ where: { id }, include: [{ model: Book }, { model: User, attributes: ["id", "nom", "prenom", "email","ville","pays"] }] });
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

module.exports = { addOrder, getOrders, getOrdersOfUser, showOrder, updateOrder, updateOrderStatus, deleteOrder }