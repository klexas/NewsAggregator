// Mongo mongoose model for links
var mongo = require("../services/mongo");

var Schema = mongo.Schema;

var LinkSchema = new Schema({
    author: String,
    title: String,
    url: String,
    slug: String,
    description: String,
    date: { type: Date, default: Date.now },
    comment_count: { type:Number, default: 0 },
    hidden: { type:Boolean, default: false },
    meta: {type: Object, default: {
        votes: 0,
        favs: 0,
        aggregate_rating: 0
        }
    }
});

module.exports = {
    Link: mongo.model('Link', LinkSchema)
}