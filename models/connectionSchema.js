// Mongo mongoose model for connectedUsers websocket
var mongo = require("../services/mongo");

var Schema = mongo.Schema;

var ConnectedUserSchema = new Schema({
    username: String,
    socket_id: String,
    date: { type: Date, default: Date.now },
});

module.exports = {
    ConnectedUser: mongo.model("ConnectedUser", ConnectedUserSchema),
};