const { Schema, model } = require('mongoose');

const stateSchema = new Schema({
    sort: {
        type: Schema.Types.String,
        required: [true, 'Sort is required'],
    },
    description: {
        type: Schema.Types.String,
        required: [true, 'Description is required']
    },
    imagePath: {
        type: Schema.Types.String,
        required: [true, 'Image is required']
    },
    price: {
        type: Schema.Types.Number,
        required: [true, 'Price is required']
    },
    weigth: {
        type: Schema.Types.Number,
        default: 0
    },
    quantity: {
        type: Schema.Types.Number,
        default: 0
    },
    creatorId: { type: Schema.Types.ObjectId },
    cherryId: { type: Schema.Types.ObjectId }

});

const State = model('State', stateSchema);

module.exports = State;