const bcrypt = require('bcryptjs')
const User = require('../models/Users.model');
const jwt = require('jsonwebtoken')
async function register(req, res) {
  try {
    const { nom, prenom, email, mdp, isAdmin } = req.body;

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(mdp, salt);

    const user = await User.create({
      nom,
      prenom,
      email,
      mdp: hashedPassword,
      isAdmin,
    });

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function login(req, res) {
  try {
    const { email, mdp, rememberMe } = req.body;

    const user = await User.findOne({ where: { email }, attributes: ['id', 'nom', 'prenom', 'email', 'isAdmin', 'mdp'] });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const testHash = await bcrypt.hash('password123', 10);
    console.log('Fresh hash of "password123":', testHash);
    console.log('Matches stored hash?', await bcrypt.compare('password123', user.mdp));
    const isMatch = await bcrypt.compare(mdp, user.mdp);
    console.log(user.mdp, "mdp:", mdp);
    if (!isMatch) {
      console.log(isMatch);

      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // 3. Generate JWT token
    const expiresIn = rememberMe ? '90d' : '1d';
    const token = jwt.sign(
      {
        id: user.id,
        name: user.nom,  
        isAdmin: user.isAdmin
      },
      process.env.JWT_SECRET,
      { expiresIn } 
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.nom,
        prenom:user.prenom,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: 'Internal server error' ,error:error});
  }
}
module.exports = { register, login };

