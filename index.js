const express = require("express");
const hbs = require("hbs");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");

const app = express();
require("./config/passport")(passport);
hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static("public"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "hbs");
app.use(
  session({
    secret: "EXPRESS-IS-AWESOME",
    saveUninitialized: true,
    resave: false
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});
app.use("/", require("./controllers/application.js"));
app.use("/user", require("./controllers/user"));
app.use("/tweet", require("./controllers/tweet"));

app.all("*", (req, res) => {
  res.status(400).send();
});

app.listen(3000, () => console.log("server is running"));
