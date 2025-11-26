const express = require('express');
const { body } = require('express-validator');

const inventoryController = require('../controllers/inventory');

const router = express.Router();

// Products //

// implement pagination and search
router.get('/products', inventoryController.getAllProducts);

router.get('/products/:id', inventoryController.getSingleProduct);

router.post(
    '/products',
    [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('sku').trim().notEmpty().withMessage('SKU is required'),
        body('price')
            .notEmpty()
            .withMessage('Price is required')
            .isFloat({ min: 0 })
            .withMessage('Price must be >= 0'),
        body('stock')
            .optional()
            .isInt({ min: 0 })
            .withMessage('Stock must be >= 0'),
    ],
    inventoryController.createProduct
);

router.put(
    '/products/:id',
    [
        body('name').trim().notEmpty().withMessage('Name is required'),
        body('sku').trim().notEmpty().withMessage('SKU is required'),
        body('price')
            .notEmpty()
            .withMessage('Price is required')
            .isFloat({ min: 0 })
            .withMessage('Price must be >= 0'),
        body('stock')
            .optional()
            .isInt({ min: 0 })
            .withMessage('Stock must be >= 0'),
    ],
    inventoryController.updateProduct
);

router.delete('/products/:id', inventoryController.deleteProduct);

// Orders //

router.get('/orders', inventoryController.getAllOrders);

router.get('/orders/:id', inventoryController.getSingleOrder);

router.post('/orders', (req, res, next) => {
    res.send('POST /orders');
});

module.exports = router;
