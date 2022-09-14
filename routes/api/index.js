var express = require("express");
const commentService = require("../../services/commentService");
var router = express.Router();
var linkService = require("../../services/linkService");

router.get("/", function (req, res) {
  linkService.getLinks(function (err, links) {
    if (err) {
      res.send(err);
    } else {
      res.send(links);
    }
  });
});

router.get('/comments/:id', async function (req, res) {
  console.log(req.params.id);
  let comments = await commentService.getComments(req.params.id);
  res.send(comments);
  });
  
router.get("/:id", async function (req, res) {
  // Get comments for this link 
  let comments = await commentService.getComments(req.params.id);
  linkService.getLink(req.params.id, function (err, link) {
    if (err) {
      res.send(err);
    } else {
      res.send({
        author: link.author ?? 'Anonymous',
        id: link._id,
        title: link.title,
        url: link.url,
        votes: link.meta.votes,
        date: link.date.toLocaleString(),
        comment_count: comments.length,
        comments: comments
      });
    }
  });
});

router.post("/submit", function (req, res) {
  linkService.addLink(req.body, function (err, link) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      console.log(link);
      res.status(201).send(link);
    }
  });
});

// router for comments - bit weird to have it here but it works
router.get("/comments", function (req, res) {
  commentService.getComments(req.params.link, function (err, comments) {
    if (err) {
      res.send(err);
    } else {
      res.send(comments);
    }
  });
});

router.post('/link/:id/vote', async function (req, res) {
  await linkService.vote(req.params.id, req.body.vote);
  res.send({
    id: req.params.id,
  });
});


// Add comment router
router.post("/comment/:link", function (req, res) {
  console.log('Comment posted : ' + req.params.link);
  req.body.link_id = req.params.link;
  commentService.addComment(req.body, function (err, comment) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(comment);
      
    }
  });
});

module.exports = router;
