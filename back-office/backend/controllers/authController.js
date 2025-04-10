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

async function login (req, res) {
 try{
   const { email, mdp } = req.body;
 const user = await User.findOne({ where: { email } });
 if (!user) {
   return res.status(400).json({ message: 'Invalid email ' });
 }
const hashedPassword = bcrypt.hash(mdp)
 const isMatch = bcrypt.compare(hashedPassword,user.mdp); 
 if (!isMatch) {
   return res.status(400).json({ message: 'Wrong password.' });
 }
 const token = jwt.sign({ id: user.id, nom: user.nom, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '1d' });


 res.status(200).json({ message: 'Login successful', token });

 }
 catch(error){
  console.log("Error Login",error)
 }


 }

module.exports = { register, login };

