const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const columnSchema = new Schema({
    title: {
        type: String,
        enum: [
            'Que se hizo bien',
            'Para mejorar',
            'Accionables'
        ],
        required: true
    },
    cards: [{
        type: Schema.Types.ObjectId,
        ref: 'Card'
    }],
    color: {
        type: String,
        default: "#8FC3CD",
        required: true
    }
});

const Column = mongoose.model('Column', columnSchema);

module.exports = Column;