const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
});

const Column = mongoose.model('Column', columnSchema);

module.exports = Column;