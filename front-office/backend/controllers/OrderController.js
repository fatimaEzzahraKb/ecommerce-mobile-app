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


module.exports = { addOrder, getOrders }