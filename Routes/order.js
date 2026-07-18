const express = require('express');
const router = express.Router();
const orderController = require('../Controlls/order');

router.post('/create', orderController.createOrder);
router.get('/all', orderController.getOrders);

module.exports = router;
