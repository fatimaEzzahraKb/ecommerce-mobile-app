var express = require('express');
const auth = require('../middlewares/auth');
const { addToCart, getUserCart, removeBookFromCart } = require('../controllers/CartController');
var router = express.Router();

router.post('/', auth, addToCart);
router.get('/:user_id',getUserCart);
router.delete('/:user_id/:book_id',removeBookFromCart);

module.exports=router;