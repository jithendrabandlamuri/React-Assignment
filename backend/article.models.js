const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    title: { type: String },
    text: { type: String },
    author: { type: String },
    email:{type: String}
});

module.exports = mongoose.model('Article', articleSchema);