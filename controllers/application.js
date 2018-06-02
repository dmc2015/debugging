const { Tweet } = require("../models/Tweet");

module.exports = {
  index: (req, res) => {
    Tweet.find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("author")
      .then(tweets => {
        res.render("app/index", { tweets });
      });
  }
};
