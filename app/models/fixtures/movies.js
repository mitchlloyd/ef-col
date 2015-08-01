/* globals _ */
const { times, clone, merge } = _;

let movieTemplate = {
  title: "Interstellar",
  tagline: "Mankind was born on Earth. It was never meant to die here.",
  overview: "Interstellar chronicles the adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
  posterPath: "/movie-posters/m0UDkSPoVkmNfXFR9FN13yewy4B.jpg",
  runtime: 169,
};

function createMovieTemplate(i) {
  let movie = clone(movieTemplate);
  return merge(movie, { id: (i + 1)+"" });
}

let movies = times(20, createMovieTemplate);

export default movies;
