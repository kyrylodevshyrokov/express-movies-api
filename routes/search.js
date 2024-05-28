const express = require("express");
const movies = require("../data/movies");
const people = require("../data/people");
const router = express.Router();

function queryRequired(req, res, next) {
  const searchTerm = req.query.query;

  if (!searchTerm) {
    res.json({ msg: "Query is required" });
  }
  next();
}

router.use(queryRequired);

/* GET search page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Express" });
});

router.get("/movie", (req, res, next) => {
  const searchTerm = req.query.query;

  const results = movies.filter((movie) => {
    found =
      movie.overview.includes(searchTerm) || movie.title.includes(searchTerm);
    return found;
  });
  res.json({ results });
});

router.get("/person", (req, res, next) => {
  const searchTerm = req.query.query;

  const results = people.filter((person) => {
    found = person.name.includes(searchTerm);
    return found;
  });
  res.json({ results });
});

module.exports = router;
