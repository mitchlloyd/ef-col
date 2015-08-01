var _ = require('lodash');
var writePosition = require('../utils/position-store').write;
var readPosition = require('../utils/position-store').read;
var requireUser = require('../utils/authentication-store').requireUser;

var allMovies = require('../fixtures/all-movies');
require('../add-fixtures')(allMovies);

module.exports = function(app) {
  var express = require('express');
  var moviesRouter = express.Router();

  moviesRouter.get('/', requireUser, function(req, res) {
    res.send({
      'movies': allMovies
    });
  });

  moviesRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  moviesRouter.get('/:id', requireUser, function(req, res) {
    var id = Number(req.params.id);
    var movie = _.findWhere(allMovies, { id: id });
    movie.position = readPosition(id);

    res.send({
      'movies': movie
    });
  });

  moviesRouter.put('/:id', function(req, res) {
    var id = req.params.id;
    var position = req.body.movie.position;

    writePosition(id, position);

    res.send({
      'movies': {
        id: id
      }
    });
  });

  moviesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/movies', moviesRouter);
};
