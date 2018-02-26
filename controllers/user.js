const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
const Tweet = require("../models/Tweet");

router.get("/login", (req, res) => {
  res.render("user/login", { message: req.flash("signupMessage") });
});

router.get("/sign-up", (req, res) => {
  res.render("user/signup", { message: req.flash("signupMessage") });
});

router.post("/sign-up", (req, res) => {
  const signup = passport.authenticate("local-signup", {
    successRedirect: "/",
    failureRedirect: "/signup",
    failureFlash: true
  });

  return signup(req, res);
});

router.post("/login", (req, res) => {
  const login = passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
  });

  return login(req, res);
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.get("/:id", (req, res) => {
  User.findOne({ _id: req.params.id })
    .populate({
      path: "tweets",
      options: { limit: 5, sort: { createdAt: -1 } }
    })
    .then(user => {
      res.render("user/show", { user });
    });
});

module.exports = router;
