/*

  Templating with {{#each}} and {{property}}
  ------------------------------------------

  In this step you'll dynamically render the list of movies using a handlebars
  expression and the each helper. When you're finished, you should have markup
  for each movie that looks similar to this:

  <div class="movie-grid-item">
    <img src="/movie-posters/abc123.jpg">
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

module('step-04: Showing movie posters', {
  beforeEach: function() {
    application = startApp();
    login();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    logout();
  }
});

test('Rendering the list of movie posters', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('.movie-grid-item').length, 20, "there are 20 movie-grid-item elements");

    let expectedSrc = "/movie-posters/m0UDkSPoVkmNfXFR9FN13yewy4B.jpg";
    let actualMovieSrc = find('.movie-grid-item:first img').attr('src');
    assert.equal(actualMovieSrc, expectedSrc, "The first movie has the correct src attribute");
  });
});
