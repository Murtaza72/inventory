const express = require('express');
const { check, body } = require('express-validator');
const authController = require('../controllers/auth.js');

const router = express.Router();

router.post(
    '/register',
    [
        body('email', 'Enter a valid email').isEmail().normalizeEmail(),
        body(
            'password',
            'Password should contain only numbers, text and length >= 8'
        )
            .isLength({ min: 8 })
            .isAlphanumeric()
            .trim(),
    ],
    authController.register
);

router.post(
    '/login',
    [
        body('email')
            .isEmail()
            .withMessage('Enter a valid email address')
            .normalizeEmail(),
        body('password', 'Invalid password')
            .isLength({ min: 8 })
            .isAlphanumeric()
            .trim(),
    ],
    authController.login
);

module.exports = router;
