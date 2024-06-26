const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
require("dotenv").config();
const status = require("http-status");

const session = require("express-session");

const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;

var indexRouter = require("./routes/index");
const movieRouter = require("./routes/movie");
const searchRouter = require("./routes/search");

const app = express();
app.use(helmet());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
const passportConfig = require("./config");
passport.use(
  new GitHubStrategy(passportConfig, function (
    accessToken,
    refreshToken,
    profile,
    cb
  ) {
    return cb(null, profile);
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/movie", movieRouter);
app.use("/search", searchRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || status.INTERNAL_SERVER_ERROR);
  res.render("error");
});

module.exports = app;
