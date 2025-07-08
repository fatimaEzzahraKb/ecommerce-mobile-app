var express = require('express');
var router = express.Router();

const auth = require('../middlewares/auth');

const { getOrders, addOrder, getOrdersOfUser, updateOrder, showOrder, updateOrderStatus, deleteOrder, getOrderById } = require("../controllers/OrderController");

router.get('/',getOrders);
router.post('/', auth, addOrder);
router.get('/user/:id',getOrdersOfUser);
router.get('/:id',showOrder);
router.put("/:id",updateOrder)
router.put("/status/:id",updateOrderStatus)
router.delete("/:id",deleteOrder)
router.get('/details/:id', getOrderById);



module.exports = router;