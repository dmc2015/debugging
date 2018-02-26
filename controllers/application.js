const express = require("express");
const router = express.Router();
const Tweet = require("../models/Tweet");

router.get("/", (req, res) => {
  Tweet.find({})
    .sort({ createdAt: -1 })
    .limit(10)
    .populate("author")
    .then(tweets => {
      res.render("app/index", { tweets });
    });
});

module.exports = router;
