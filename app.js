const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const authRoutes = require('./routes/auth');
const inventoryRoutes = require('./routes/inventory');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);
app.use(inventoryRoutes);

mongoose
    .connect(process.env.MONGODB_URI, {})
    .then(
        app.listen(process.env.PORT, () => {
            console.log(process.env.HOST + ':' + process.env.PORT);
        })
    )
    .catch(err => console.error('MongoDB connection error:', err));
