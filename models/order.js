const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const order = new Schema({
    id: {
        type: Number,
        unique: true,
    },
    order_number: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    total_amount: {
        type: Number,
        required: true,
        min: 0,
    },
    items: [
        {
            product_id: { type: Number, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        },
    ],
});

module.exports = mongoose.model('Order', order);
