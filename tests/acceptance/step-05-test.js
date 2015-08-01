/*

  Dynamic Routing
  ---------------

  We've already learned about creating creating simple routes to navigate
  between the index and the about pages. Now we're going to create dynamic links,
  or links that vary based on the data we pass to the {{link-to}} helper.

  Create a route entry in your router.js file to handle this new type of route.
  Then use the {{link-to}} helper to make each of the movie posters a link.

  The new markup for each movie will look something like this:

  <a class="movie-grid-item" href='/movie/123456'>
    <img src="/movie-posters/abc123.jpg">
  </div>

  Your links should lead to a new "movie" template. For now, just make sure
  this template renders an element containing an element with the
  'movie-detail' class in order to get the test passing.

*/

import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'video-vault/tests/helpers/start-app';
import { login, logout } from 'video-vault/tests/helpers/login';

let application;

module('step-05: Linking to a movie', {
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
  visit('/');
  click('.movie-grid-item:first');

  andThen(function() {
    assert.ok(currentURL().match(/\/movie\/\d+/), "user navigates to the movie page");
    assert.equal(find('.movie-detail').length, 1, "the movie template was rendered");
  });
});
