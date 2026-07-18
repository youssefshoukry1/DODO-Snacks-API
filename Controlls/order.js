const Order = require('../models/order');

exports.createOrder = async (req, res) => {
    try {
        const { userName, userPhone, products, totalPrice } = req.body;
        const newOrder = new Order({
            userName,
            userPhone,
            products,
            totalPrice
        });
        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
