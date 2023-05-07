const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardSchema = new Schema({
    title: {
        type: String, required: true
    },
    description: {
        type: String
    },
    column: {
        type: Schema.Types.ObjectId,
        ref: 'Column',
        required: true
    }
});

const columnSchema = new Schema({
    title: {
        type: String,
        enum: [
            'Qué hizo bien',
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