const {Schema, model} = require('../services/mongo');

const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    date: { type: Date, default: Date.now },
    comment_count: Number,
    enabled: Boolean,
});

const User = model('User', UserSchema);

module.exports = User;