const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    total: {
        type: Schema.Types.Number,
        required: [true, 'Total is required']
    },
    date:{
        type: Schema.Types.Date,
        required: [true, 'Date is required'],
        default: Date.now
    },
    status: {
        type: Schema.Types.String,
        required: [true, 'Status is required']
    },
    cherryArray: [{ type: Schema.Types.String}],
    creatorId: { type: Schema.Types.ObjectId }
});

const Order = model('Order', orderSchema);
module.exports = Order;