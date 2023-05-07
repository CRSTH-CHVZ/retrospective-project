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
        type: Number
    },
    comments: {
        type: [String],
        default: []
    }
});

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const columnSchema = new Schema({
    title: {
        type: String,
        enum: [
            'Que hizo bien',
            'Para mejorar',
            'Kudos'
        ],
        required: true
    },
    cards: [{
        type: Schema.Types.ObjectId,
        ref: 'Card'
    }]
})

const Card = mongoose.model('Card', cardSchema);
const Column = mongoose.model('Column', columnSchema);

module.exports = { Card, Column };