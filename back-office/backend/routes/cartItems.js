var express = require('express');
const auth = require('../middlewares/auth');
const { addToCart, getUserCart, removeBookFromCart, getAllUsersWithCart } = require('../controllers/CartController');
var router = express.Router();

/* GET users listing. */

router.get('/:user_id',getUserCart);
router.get('/',getAllUsersWithCart);
router.post('/',auth,addToCart);
// router.put('/:id',updateCategory);
router.delete('/:user_id/:book_id',removeBookFromCart);
module.exports = router;
