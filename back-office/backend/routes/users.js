var express = require('express');
const { register, login } = require('../controllers/authController');
const {getUsers, deleteUser, editUser, updateUser} = require("../controllers/UserControllers")
var router = express.Router();

/* GET users listing. */

router.post('/register',register);
router.post('/login',login);
router.get('/',getUsers);
router.get('/edit/:id',editUser);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);
module.exports = router;
