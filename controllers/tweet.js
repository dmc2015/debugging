const Tweet = require('../models/Tweet');

module.exports = {
  create: (req, res) => {
    Tweet.create({
      content: req.body.tweet.content,
      author: req.user._id
    }).then(tweet => {
      req.user.tweets.push(tweet);
      req.user.save(err => {
        res.redirect(`/tweet/${tweet._id}`);
      });
    });
  },
  new: (req, res) => {
    res.render('tweet/new');
  },
  show: (req, res) => {
    Tweet.findOne({ _id: req.params.id }).then(tweet => {
      res.render('tweet/show', tweet);
    });
  },
  requireAuth: function(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/');
    }
  }
};
