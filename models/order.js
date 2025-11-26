const mongoose = require('mongoose');
const Counter = require('./counter');

const Schema = mongoose.Schema;

const order = new Schema({
    id: {
        type: Number,
        unique: true,
    },
    order_number: {
        type: String,
        unique: true,
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

order.pre('save', async function (next) {
    if (this.id) return next;

    const counter = await Counter.findByIdAndUpdate(
        { _id: 'order' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    this.id = counter.seq;
    this.order_number = 'ORD100' + counter.seq;
    return next;
});

module.exports = mongoose.model('Order', order);
