var express = require('express');
var router = express.Router();

const auth = require('../middlewares/auth');

const { addOrder, getOrders } = require("../controllers/OrderController");

router.post('/', auth, addOrder);
router.get('/', getOrders);

module.exports = router;