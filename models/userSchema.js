const {Schema, model} = require('../services/mongo');

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    email: {
        type: String,
        unique: true
    },
    date: { type: Date, default: Date.now },
    comment_count: Number,
    enabled: {
        type: Boolean,
        unique: true,
        default: true
    },
});

const User = model('User', UserSchema);

module.exports = User;