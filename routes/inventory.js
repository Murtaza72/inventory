const express = require('express');

const inventoryController = require('../controllers/inventory');

const router = express.Router();

// Products //

router.get('/products/:id', inventoryController.getSingleProduct);

// implement pagination and search
router.get('/products', inventoryController.getAllProducts);

router.post('/products', inventoryController.createProduct);

router.put('/products/:id', (req, res, next) => {
    res.send('PUT /products/' + req.params.id);
});

router.delete('/products/:id', (req, res, next) => {
    res.send('DELETE /products/' + req.params.id);
});

// Orders //

router.get('/orders', inventoryController.getAllOrders);

router.get('/orders/:id', inventoryController.getSingleOrder);

router.post('/orders', (req, res, next) => {
    res.send('POST /orders');
});

module.exports = router;
