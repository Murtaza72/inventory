const Product = require('../models/product');
const Order = require('../models/order');

exports.createProduct = (req, res, next) => {
    if (!req.body)
        return res.status(400).json({ error: 'no data was provided' });

    const name = req.body.name;
    const sku = req.body.sku;
    const price = req.body.price;
    const stock = req.body.stock;

    if (!name || !sku || price == null) {
        return res
            .status(400)
            .json({ error: 'name, sku, and price are required' });
    }

    if (price < 0) {
        return res.status(400).json({ error: 'price must be >= 0' });
    }

    if (stock != null && stock < 0) {
        return res.status(400).json({ error: 'stock must be >= 0' });
    }

    Product.findOne({ sku: sku }).then(exists => {
        if (exists)
            return res
                .status(400)
                .json({ error: 'Product with this SKU already exists' });

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
                const error = new Error(err);
                console.log(err);
                error.httpStatusCode = 500;
                return next(error);
            });
    });
};

exports.getSingleProduct = (req, res, next) => {
    const id = req.params.id;

    Product.findOne({ pid: id })
        .then(product => {
            if (product) {
                return res.status(201).json(product);
            } else
                return res
                    .status(404)
                    .json({ error: "Product with this id doesn't exist" });
        })
        .catch(err => {
            const error = new Error(err);
            console.log(err);
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
            const error = new Error(err);
            console.log(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

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
            const error = new Error(err);
            console.log(err);
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
            const error = new Error(err);
            console.log(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};
