const express = require('express');
const router = express.Router();
const productController = require('../Controlls/product');

router.post('/add', productController.addProduct);
router.get('/all', productController.getProducts);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
