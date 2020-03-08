const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    total: {
        type: Schema.Types.Number,
        required: [true, 'Total is required']
    },
    date: {
        type: Schema.Types.Date,
        required: [true, 'Date is required'],
        default: Date.now
    },
    commingDate: {
        type: Schema.Types.Date
    },
    status: {
        type: Schema.Types.String,
        required: [true, 'Status is required'],
        default: "Pending"
    },
    productsJson: { type: Schema.Types.String },
    creatorId: { type: Schema.Types.ObjectId , ref: "User"},
    // user: { type: Schema.Types.ObjectId, ref: "User" }
});

const Order = model('Order', orderSchema);
module.exports = Order;