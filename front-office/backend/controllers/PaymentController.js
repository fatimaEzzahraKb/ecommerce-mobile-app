const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { User } = require('../models/index.model');

const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;
  const user_id = req.user.id; // ✅ Récupéré automatiquement via le middleware d'auth

  try {
    const user = await User.findByPk(user_id);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    let customerId = user.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        name: `${user.prenom} ${user.nom}`,
        email: user.email,
      });

      customerId = customer.id;
      user.stripe_customer_id = customerId;
      await user.save();
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'eur',
      customer: customerId,
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createPaymentIntent };
