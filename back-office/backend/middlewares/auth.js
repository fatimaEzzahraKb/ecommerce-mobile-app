// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'Aucun token fourni' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // vérifie le token
    req.user = decoded; // injecte les infos dans req.user
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token invalide' });
  }
};
