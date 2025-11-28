const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { validationResult } = require('express-validator');

exports.register = (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array().map(err => err.msg),
        });
    }

    User.findOne({ email: email })
        .then(user => {
            if (user)
                return res.status(400).json({ message: 'User already exists' });

            bcrypt
                .hash(password, 12)
                .then(hashed => {
                    const user = new User({
                        email: email,
                        password: hashed,
                    });

                    return user.save();
                })
                .then(() => {
                    return res
                        .status(201)
                        .json({ message: 'Registered successfully' });
                });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array().map(err => err.msg),
        });
    }

    User.findOne({ email: email })
        .then(user => {
            if (!user)
                return res.status(400).json({ message: 'Invalid credentials' });

            bcrypt.compare(password, user.password).then(success => {
                if (!success)
                    return res
                        .status(400)
                        .json({ message: 'Invalid credentials' });

                const token = jwt.sign(
                    { id: user.id, email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: process.env.JWT_EXPIRES_IN }
                );

                return res.json({ token });
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};
