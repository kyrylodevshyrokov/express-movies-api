const express = require("express");
const router = express.Router();

const movieDetails = require("../data/movieDetails");

function requireJSON(req, res, next) {
  if (!req.is("application/json")) {
    res.json({
      msg: "Content type must be application/json",
    });
  }
  next();
}

/* GET movie page. */

router.get("/top_rated", (req, res, next) => {
  let page = req.query.page;

  if (!page) {
    page = 1;
  }

  const results = movieDetails.sort((a, b) => {
    return b.vote_average - a.vote_average;
  });

  const indexToStart = (page - 1) * 20;

  res.json(results.slice(indexToStart, indexToStart + 20));
});

router.get("/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;
  const results = movieDetails.find((movie) => {
    return movie.id === parseInt(movieId);
  });

  if (!results) {
    res.status(404);
    res.json({
      msg: "Movie ID not found",
      production_companies: [],
    });
  }

  res.status(200);
  res.json(results);
});

router.post("/:movieId/rating", requireJSON, (req, res, next) => {
  const userRating = req.body.value;

  if (userRating < 0.5 || userRating > 10) {
    res.json({
      msg: "Rating must be between .5 and 10",
    });
  }
  res.json({
    msg: "Thank you for submitting your rating",
    status_code: 200,
  });
});

router.delete("/:movieId/rating", requireJSON, (req, res, next) => {
  res.json({ msg: "Rating deleted" });
});

module.exports = router;
