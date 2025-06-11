const bcrypt = require('bcryptjs')
const User = require('../models/Users.model');
const jwt = require('jsonwebtoken');
const { ValidationError, UniqueConstraintError } = require('sequelize');
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
    if (error instanceof UniqueConstraintError) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" })
    }
    if (error instanceof ValidationError) {
      const messages = error.errors.map(e => e.message)
      return res.status(400).json({ message: messages })
    }
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
        nom: user.nom,
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
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: 'Internal server error', error: error });
  }
}

async function changePassword(req, res) {
  try {
    const { password, confirmPassword } = req.body;
    const id =parseInt(req.params.id);
    const user = await User.findByPk(id);
    if (user) {
      if (password === confirmPassword) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.mdp = hashedPassword;
        await user.save();
        return res.status(200).json({message:'Password is changed Succussfully!',user:user});
      }
      else {
        return res.status(401).send('Passwords are not identique!');
      }
    }
    else {
      return res.status(404).send('User not found!');

    }
  }
  catch (err) {
    console.log(err);
    return res.status(500).send('Internal Server Error ');

  }
}
module.exports = { register, login, changePassword };

