/*

  Loading Data for a Dynamic Route
  --------------------------------

  Now we have a little predicament with out current setup. We're able to
  load the list of all movies correctly on the index page, but how will
  we load the correct movie when we use our dynamic movie route?

  In this step you'll use the argument passed in the model hook to load
  a single movie from the fixtures file.

  To prove that you've loaded a movie file we'll begin showing the attributes
  of a movie.

  When you're finished with this step, the markup on your movie page
  should look like this:

  <div class="media clearfix movie-detail">
    <span class="media__image">
      <img src="/movie-posters/abc123.jpg">
    </span>

    <div class="media__content">
      <h2 class="media__title"><!-- Movie Title --></h2>
      <p class="tagline">"<!-- Movie tagline -->"</p>
      <p class="overview"><!-- Movie overview --></p>
    </div>
  </div>

*/

import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'video-vault/tests/helpers/start-app';
import { login, logout } from 'video-vault/tests/helpers/login';

let application;

module('step-06: Loading a single movie', {
  beforeEach: function() {
    application = startApp();
    login();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    logout();
  }
});

test('navigating from the index page to a movie page', function(assert) {
  let firstMovieURL;

  visit('/');
  click('.movie-grid-item:first');

  andThen(function() {
    firstMovieURL = currentURL();
    assert.equal(find('.movie-detail').length, 1, "the movie template was rendered");
  });

  andThen(function() {
    assert.equal(find('.media__image img').attr('src'), '/movie-posters/m0UDkSPoVkmNfXFR9FN13yewy4B.jpg', "shows the movie poster");
    assert.elementHasContent(find('.media__title'), 'Interstellar');
    assert.elementHasContent(find('.tagline'), 'Mankind was born');
    assert.elementHasContent(find('.overview'), 'chronicles the adventures');
  });

  andThen(function() {
    return visit(firstMovieURL);
  });

  andThen(function() {
    assert.elementHasContent(find('.media__title'), 'Interstellar');
  });
});

