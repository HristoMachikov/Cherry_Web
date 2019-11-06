const { Schema, model } = require('mongoose');

const stateSchema = new Schema({
    total: {
        type: Schema.Types.Number,
    },
    cherryArray: [{ type: Schema.Types.String}],
    creatorId: { type: Schema.Types.ObjectId }
});

const State = model('State', stateSchema);

module.exports = State;