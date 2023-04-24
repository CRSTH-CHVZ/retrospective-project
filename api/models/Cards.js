const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: DEFINE CARD SCHEMA
const CardSchema = new Schema({
    text: {
        type: String,
        required: true,
    }
})

const Card = mongoose.model("Card", CardSchema);

module.exports = Card;