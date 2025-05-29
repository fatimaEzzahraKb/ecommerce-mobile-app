var express = require('express');
const { register, login, changePassword } = require('../controllers/authController');
const {getUsers, deleteUser, editUser, updateUser, showUser} = require("../controllers/UserControllers")
var router = express.Router();

/* GET users listing. */

router.post('/register',register);
router.post('/login',login);
router.post('/changePassword/:id',changePassword);
router.get('/',getUsers);
router.get('/:id',showUser );
router.get('/edit/:id',editUser);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);
module.exports = router;
