const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    cardId: {
        type: Schema.Types.ObjectId,
        ref: 'Card'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;