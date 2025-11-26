const express = require('express');
const { body } = require('express-validator');

const inventoryController = require('../controllers/inventory');

const router = express.Router();

// Products //

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

router.post(
    '/orders',
    [
        body('items').isArray({ min: 1 }),
        body('items.*.product_id')
            .notEmpty()
            .withMessage('product_id is required')
            .isInt({ min: 1 })
            .withMessage('invalid id'),
        body('items.*.quantity')
            .notEmpty()
            .withMessage('quantity is required')
            .isInt({ min: 1 })
            .withMessage('quantity must be at least 1'),
    ],
    inventoryController.createOrder
);

module.exports = router;
