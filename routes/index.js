var express = require("express");
var router = express.Router();

const movies = require("../data/movies");
const passport = require("passport");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/login", passport.authenticate("github"));

router.get(
  "/auth",
  passport.authenticate("github", {
    successRedirect: "/",
    failureRedirect: "/loginFailed",
  })
);

router.get("/most_popular", (req, res, next) => {
  let page = req.query.page;

  if (page === undefined) {
    page = 1;
  }

  let results = movies.filter((movie) => {
    return movie.most_popular;
  });

  const indexToStart = (page - 1) * 20;
  results = results.slice(indexToStart, indexToStart + 19);

  res.json({ page, results });
});

module.exports = router;
