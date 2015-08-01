/*

  Release Year and Rating
  -----------------------

  Next we're going to learn about computed properties. we're going to add the
  releaseYear and rating to our movie model.

  The releaseYear should use the releaseDate to compute the 4 digit
  year.

  The rating should use the voteAverage to calculate a 0% - 100%
  value.

  When you add these values to your template your markup should look
  like this:

    <div class="media__content">
      <h2 class="media__title"><!-- Movie Title (Release Year) --></h2>
      <p class="tagline">"<!-- Movie Tagline -->"</p>
      <p class="overview"><!-- Movie Overview --></p>
      <p class="rating">Rating: <!-- Movie Rating --></p>
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

module('step-12: computed properties', {
  beforeEach: function() {
    application = startApp();
    login();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    logout();
  }
});

test('showing the relase year and rating', function(assert) {
  visit('/movie/157336');

  andThen(function() {
    assert.equal(find('.media__title').text().trim(), 'Interstellar (2014)', "has the movie title with release year");
    assert.equal(find('.rating').text().trim(), 'Rating: 86%', "shows the rating as a percentage");
  });
});
