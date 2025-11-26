const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const inventoryRoutes = require('./routes/inventory');
const authRoutes = require('./routes/auth');

const PORT = 3000;
const MONGODB_URI = `mongodb://127.0.0.1:27017/inventory`;

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);
app.use(inventoryRoutes);

mongoose
    .connect(MONGODB_URI, {})
    .then(
        app.listen(PORT, () => {
            console.log('http://localhost:' + PORT);
        })
    )
    .catch(err => console.error('MongoDB connection error:', err));
