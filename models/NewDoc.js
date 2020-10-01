const mongoose = require('mongoose');
const User = require('./User');

const NewDoc = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    doc: [{
        _id: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        }
    }],
    contentLength: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }

});

module.exports = mongoose.model('newdoc', NewDoc);