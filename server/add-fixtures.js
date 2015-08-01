var path = require('path');

module.exports = function addFixtures(movies) {
  movies.forEach(function(movie) {

    movie["video"] = "/api/videos/bbb.mp4";
  });
}
