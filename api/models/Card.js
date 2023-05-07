const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    text: {
        type: String, required: true
    },
    column: {
        type: Schema.Types.ObjectId,
        ref: 'Column',
        required: true
    },
    isLike: {
        type: Boolean
    },
    amountOfLikes: {
        type: Number,
        default: 0
    },
    comments: {
        type: [String],
        default: []
    },
    // TODO: AGREGAR CAMPO MODIFICADO
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;