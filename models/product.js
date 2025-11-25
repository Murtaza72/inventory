const mongoose = require('mongoose');

const Counter = require('./counter');

const Schema = mongoose.Schema;

const product = new Schema(
    {
        pid: {
            type: Number,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        sku: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        stock: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);

product.pre('save', async function (next) {
    const counter = await Counter.findByIdAndUpdate(
        { _id: 'product' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );

    this.pid = counter.seq;
    return next;
});

module.exports = mongoose.model('Product', product);
