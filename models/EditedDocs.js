const mongoose = require('mongoose');
const NewDoc = require('./NewDoc');
const User = require('./User');

const EditedDocs = mongoose.Schema({
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    },
    mainId: {
        type: String,
        required: String
    },
    model: {
        type: mongoose.Schema.Types.ObjectId,
        ref: NewDoc
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User
    }
})

module.exports = mongoose.model('editedDocs', EditedDocs);
