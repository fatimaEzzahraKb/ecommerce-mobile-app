var express = require('express');
const { addToCart, getUserCart, removeBookFromCart } = require('../controllers/CartController');
var router = express.Router();

/* GET users listing. */

router.get('/:user_id',getUserCart);
router.post('/',addToCart);
// router.put('/:id',updateCategory);
router.delete('/remove',removeBookFromCart);
module.exports = router;
