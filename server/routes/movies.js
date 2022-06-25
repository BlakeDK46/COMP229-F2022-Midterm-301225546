// modules required for routing
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
() => {};

// call the movies model
let movies = require("../models/movies");

/* GET movies List page. READ */
router.get("/", (req, res, next) => {
  // find all movie in the books collection
  movies.find((err, list) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("movies/index", {
        title: "Movies",
        list: list,
      });
    }
  });
});

//  GET the Movies Details page in order to add a new Movies
router.get("/add", (req, res, next) => {
  res.render("movies/details", { title: "Add Movie", list: [] });
});

// POST process the Movies Details page and create a new Movies - CREATE
router.post("/add", (req, res, next) => {
  console.log(req.body.Title);
  let newMovieToAdd = movies({
    Title: req.body.title,
    Description: req.body.description,
    Released: req.body.released,
    Director: req.body.director,
    Genre: req.body.genre,
  });
  movies.create(newMovieToAdd, (err, _) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/movies");
    }
  });
});

// GET the Movies Details page in order to edit an existing Movies

  router.get("/edit/:id", (req, res, next) => {
    let filter = req.params.id;
    movies.findById(filter, (err, MovieToEdit) => {
      //Storing the result into MovieToEdit Object
      if (err) {
        console.log(err);
        res.end(err);
      } else {
        res.render("movies/details", {
          title: "Edit a Book ",
          list: MovieToEdit,
        });
      }
    });
  });


// POST - process the information passed from the details form and update the document
router.post("/edit/:id", (req, res, next) => {
  let filter = req.params.id;
  let updateMovie = movies({
    _id: filter,
    Title: req.body.title,
    Description: req.body.description,
    Released: req.body.released,
    Director: req.body.director,
    Genre: req.body.genre,
  });

  movies.updateOne({ _id: filter }, updateMovie, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/movies");
    }
  });
});

// GET - process the delete by user id
router.get("/delete/:id", (req, res, next) => {
  let filter = req.params.id;
  movies.remove({ _id: filter }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/movies");
    }
  });
});

module.exports = router;
