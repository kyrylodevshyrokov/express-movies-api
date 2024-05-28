var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const helmet = require("helmet");

const session = require("express-session");

const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;

var indexRouter = require("./routes/index");
const movieRouter = require("./routes/movie");
const searchRouter = require("./routes/search");

var app = express();
app.use(helmet());

app.use(
  session({
    secret: "hkjg34g2jh3gj2h",
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

app.use((req, res, next) => {
  if (req.query.api_key !== "123456789") {
    res.status(401);
    res.json("Invalid API Key");
  } else {
    next();
  }
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
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
