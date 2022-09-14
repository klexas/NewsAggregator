 mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Comment Mongoose SChema
var CommentSchema = new Schema({
    link_id: String,
    author: String,
    body: String,
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number
    }
});


module.exports = {
    Comment: mongoose.model('Comment', CommentSchema)
}
