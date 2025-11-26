const { validationResult } = require('express-validator');

const Product = require('../models/product');
const Order = require('../models/order');

exports.createProduct = (req, res, next) => {
    if (!req.body)
        return res.status(400).json({ error: 'body cannot be empty' });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array().map(err => err.msg),
        });
    }

    const name = req.body.name;
    const sku = req.body.sku;
    const price = req.body.price;
    const stock = req.body.stock;

    Product.findOne({ sku: sku }).then(exists => {
        if (exists)
            return res
                .status(400)
                .json({ message: 'Product with this SKU already exists' });

        // doesnt exists, create it
        const product = new Product({
            name: name,
            sku: sku,
            price: price,
            stock: stock,
        });

        product
            .save()
            .then(product => {
                return res.status(201).json(product);
            })
            .catch(err => {
                console.log(err);
                const error = new Error(err);
                error.httpStatusCode = 500;
                return next(error);
            });
    });
};

exports.getSingleProduct = (req, res, next) => {
    const id = req.params.id;

    Product.findOne({ pid: id })
        .then(product => {
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            return res.status(200).json(product);
        })
        .catch(err => {
            console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getAllProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            return res.status(200).json(products);
        })
        .catch(err => {
            console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.updateProduct = (req, res, next) => {
    const id = req.params.id;

    if (!req.body)
        return res.status(400).json({ error: 'body cannot be empty' });

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array().map(err => err.msg),
        });
    }

    const name = req.body.name;
    const sku = req.body.sku;
    const price = req.body.price;
    const stock = req.body.stock;

    Product.findOne({ pid: id })
        .then(product => {
            if (!product)
                return res.status(404).json({ error: 'Product not found' });

            product.name = name;
            product.sku = sku;
            product.stock = stock;
            product.price = price;
            product.updated_at = new Date();

            return product.save();
        })
        .then(updatedProduct => {
            if (updatedProduct) {
                return res.status(200).json(updatedProduct);
            }
        })
        .catch(err => {
            console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.deleteProduct = (req, res, next) => {
    const id = req.params.id;

    Product.findOne({ pid: id })
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    error: 'Product not found',
                });
            }

            Product.deleteOne({ pid: id });
            return res.status(200).json({ success: 'Product deleted' });
        })
        .catch(err => {
            console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

// ----------
// Orders //
// ----------

exports.getSingleOrder = (req, res, next) => {
    const id = req.params.id;

    Order.findOne({ pid: id })
        .then(order => {
            if (order) {
                return res.status(201).json(order);
            } else
                return res
                    .status(404)
                    .json({ error: "Order with this id doesn't exist" });
        })
        .catch(err => {
            console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getAllOrders = (req, res, next) => {
    Order.find()
        .then(orders => {
            return res.status(200).json(orders);
        })
        .catch(err => {
            console.log(err);
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.createOrder = (req, res, next) => {};
