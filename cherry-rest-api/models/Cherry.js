const { Schema, model } = require('mongoose');

const cherrySchema = new Schema({
    sort: {
        type: Schema.Types.String,
        required: [true, 'Sort is required'],
        unique: true
    },
    description: {
        type: Schema.Types.String,
        required: [true, 'Description is required']
    },
    imagePath: {
        type: Schema.Types.String,
        required: [true, 'Image is required']
    },
    price:{
        type: Schema.Types.Number,
        required: [true, 'Price is required']
    },
    isPublic: { type: Schema.Types.Boolean, default: false },
    gallery: [{ type: Schema.Types.String, }]
});

cherrySchema.path('description').validate(function (v) {
    return v.length <= 80;
}, "Description must be less than 80 symbols!");

const Cherry = model('Cherry', cherrySchema);
module.exports = Cherry;