var express = require("express");
const commentService = require("../../services/commentService");
var router = express.Router();
var linkService = require("../../services/linkService");
const userService = require("../../services/userService");
const { isLoggedIn } = require("../../middleware/auth");
const { log } = require("mercedlogger");

// TODO: Split into individual route files for cleaner layout

// ~~~~~~~~~~~ Comment Section ~~~~~~~~~~~
router.get("/comments", function (req, res) {
  commentService.getComments(req.params.link, function (err, comments) {
    if (err) {
      res.send(err);
    } else {
      res.send(comments);
    }
  });
});

router.post("/comment/:link", isLoggedIn, function (req, res) {
  req.body.link_id = req.params.link;

  const { user } = req.user; // get username from req.user property created by isLoggedIn middleware
  log.magenta("Posting user : ", user.username);

  req.body.author = user.username;
  commentService.addComment(req.body, function (err, comment) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(comment);
    }
  });
});

router.get("/comments/:id", async function (req, res) {
  console.log(req.params.id);
  let comments = await commentService.getComments(req.params.id);
  res.send(comments);
});

// ~~~~~~~~~~~~~ Link Section ~~~~~~~~~~~~~~~~
router.get("/", function (req, res) {
  linkService.getLinks(function (err, links) {
    if (err) {
      res.send(err);
    } else {
      res.send(links);
    }
  });
});

router.get("/:id", async function (req, res) {
  let comments = await commentService.getComments(req.params.id);
  linkService.getLink(req.params.id, function (err, link) {
    if (err) {
      res.send(err);
    } else {
      res.send({
        author: link.author ?? "Anonymous",
        id: link._id,
        title: link.title,
        url: link.url,
        votes: link.meta.votes,
        date: link.date.toLocaleString(),
        comment_count: comments.length,
        comments: comments,
      });
    }
  });
});

router.post("/submit", isLoggedIn, function (req, res) {
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

router.post("/link/:id/vote", isLoggedIn, async function (req, res) {
  await linkService.vote(req.params.id, req.body.vote);
  res.send({
    id: req.params.id,
  });
});

// signup route
router.post("/signup", function (req, res) {
  userService.register(req.body, function (err, user) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(user);
    }
  });
});

// login route
router.post("/login", function (req, res) {
  userService.login(req.body, function (err, user) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(user);
    }
  });
});

module.exports = router;
