var mongoose = require('mongoose');
var config = require('../config');
var Link = require('../models/linkSchema');
var Comment = require('../models/commentSchema');

mongoose.connect('mongodb://'+config.database.host+'/'+config.database.collection+'');

var linkService = {
    getLinks: async (callback, index = 0) => {
        // Get max 30 links from database
        var links = await Link.Link.find({}).sort({date: -1}).limit(30);
        // Get comments for each link
        for (var i = 0; i < links.length; i++) {
            links[i].comment_count = await linkService.commentCount(links[i]._id);
        }

        if(links.err){ 
            callback(links.err, null);
        } else {
            callback(null, links);
        };
    },
    getLink: function (id, callback) {
        Link.Link.findOne({ _id: id }, function (err, link) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, link);
            }
        });
    },
    addLink: function (link, callback) {
        var newLink = new Link.Link(link);
        newLink.meta = {
            votes: 0,
            favs: 0,
            aggregate_rating: 0
        };
        newLink.save(function (err, link) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, link);
            }
        });
    },
    commentCount: async (id) => {
        var comments = await Comment.Comment.find({ link_id: id });
        return comments.length;
    },
    vote: async (id, vote) => {
        var link = await Link.Link.findOne({ _id: id });
        // If we don't have any meta create it
      
        if (!link.meta) {
            link.meta = {
                votes: 0,
                favs: 0,
                aggregate_rating: 0
            };
        }

        if (vote == 1) {
            link.meta.votes++;
            console.log("Voted up");
        } else if (vote == 0) {
            link.meta.votes--;
            console.log("Voted down");
        }

        Link.Link.findOneAndUpdate({ _id: id }, link, function (err, link) {
            if (err) {
                console.log(err);
            } else {
                console.log('Voted on : ' + link.title);
            }
        })
    },
    updateLink: function (id, link, callback) {
        Link.Link.findOneAndUpdate({ _id: id }, link, function (err, link) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, link);
            }
        });
    },
    deleteLink: function (id, callback) {
        // TODO: only if user is admin 
        Link.Link.findOneAndRemove({ _id: id }, function (err, link) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, link);
            }
        });
    }
};
module.exports = linkService;




