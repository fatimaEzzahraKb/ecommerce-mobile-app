var express = require('express');
const { register, login } = require('../controllers/authController');
const {getUsers} = require("../controllers/UserControllers")
var router = express.Router();

/* GET users listing. */

router.post('/register',register);
router.post('/login',login);
router.get('/',getUsers);
module.exports = router;
