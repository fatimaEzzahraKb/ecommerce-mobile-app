var express = require('express');
var router = express.Router();

const { getOrders, addOrder, getOrdersOfUser, updateOrder, showOrder, updateOrderStatus, deleteOrder } = require("../controllers/OrderController");

router.get('/',getOrders);
router.post('/',addOrder);
router.get('/user/:id',getOrdersOfUser);
router.get('/:id',showOrder);
router.put("/:id",updateOrder)
router.put("/status/:id",updateOrderStatus)
router.delete("/:id",deleteOrder)


module.exports = router;