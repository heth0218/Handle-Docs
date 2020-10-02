const mongoose = require('mongoose');
const NewDoc = require('./NewDoc');
const User = require('./User');

const Comment = mongoose.Schema({
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    on: {
        type: mongoose.Schema.Types.ObjectId,
        ref: NewDoc
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('comment', Comment);
