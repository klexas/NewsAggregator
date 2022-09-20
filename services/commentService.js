var Comment = require("../models/commentSchema");

var commentService = {
  getComments: async (link_id) => {
    return new Promise((resolve, reject) => {
      Comment.Comment.find({ link_id: link_id }, function (err, comments) {
        if (err) {
          reject(err);
        } else {
          resolve(comments);
        }
      });
    });
  },
  addComment: function (comment, callback) {
    // need to make a new Comment object
    var newComment = new Comment.Comment();
    newComment.author = comment.author;
    newComment.body = comment.body;
    newComment.link_id = comment.link_id;
    newComment.date = comment.date;

    newComment.save(function (err, comment) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, comment);
        console.log("Comment made on : " + comment.link_id);
      }
    });
  },
};

module.exports = commentService;
