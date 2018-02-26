const express = require("express");
const router = express.Router();
const Tweet = require("../models/Tweet");

router.use(function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/");
  }
});

router.post("/", (req, res) => {
  Tweet.create({
    content: req.body.tweet.content,
    author: req.user._id
  }).then(tweet => {
    req.user.tweets.push(tweet);
    req.user.save(err => {
      res.redirect(`/tweet/${tweet._id}`);
    });
  });
});

router.get("/new", (req, res) => {
  res.render("tweet/new");
});

router.get("/:id", (req, res) => {
  Tweet.findOne({ _id: req.params.id }).then(tweet => {
    res.render("tweet/show", tweet);
  });
});

module.exports = router;
