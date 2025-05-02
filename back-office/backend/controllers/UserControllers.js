const {User,Order} = require("../models/index.model")
async function getUsers(req, res) {
  try {
    const users = await User.findAll({include:{model:Order}});
    res.status(200).json({ users });
    console.log(users)
  }
  catch (error) {
    console.log("Error while getting users", error)
  }
}

async function editUser(req, res) {
  try {
    const id = req.params.id;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      res.status(404).send("Utilisateur non trouvé");
    }
    res.status(200).send(user);
  }
  catch (error) {
    console.log("Erreur lors de l'edit de l'utilisateur", error);
    res.status(200).send('Erreur au niveau du serveur');
  }
}

async function updateUser(req, res) {
  try {
    const id = req.params.id
    const updatedData = req.body
    const user = await User.findOne({ where: { id } });
    if (!user) {
      res.status(404).send('Utilisateur non trouvé');
    }
    await user.update(updatedData);
    res.status(200).send('Utilisateur modifié avec succès');
  }
  catch (error) {
    console.log("Erreur lors de l'update de l'utilisateur", error);
    res.status(200).send('Erreur au niveau du serveur');
  }
}

async function deleteUser(req, res) {
  try {
    const id = req.params.id
    const user = await User.findOne({ where: { id } })
    if (!user) {
      return res.status(404).send("Utilisateur non trouvé");
    }
    await user.destroy();
    res.status(200).send("Utilisateur bien supprimé");
  }
  catch (error) {
    console.log("Erreur lors de suppression de l'utilisateur", error);
    res.status(500).send("Erreur au niveau du sérveur");
  }
}

async function showUser(req, res) {
  try {
    const id = req.params.id;
    const user =await User.findOne({ where: { id } ,include:Order});
    if (!user) {
      res.status(404).send({ message: "user not found" });
    }
    res.status(200).send({user:user });

  }
  catch (error) {
    console.log("Erreur show user", error);
    res.status(500).send({ message: "Erreur", error: error });

  }
}

module.exports = { getUsers, deleteUser, editUser, updateUser,showUser };