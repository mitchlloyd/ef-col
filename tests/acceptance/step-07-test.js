/*

  Loading Data with Ember Data
  ----------------------------

  We've done about all we can with out fixture data and it's time to load
  something more substantial. For this task we're going to use Ember Data.

  Using Ember Data, modify the index and movie routes to fetch many and
  single movies from the running express server. The API will contain more
  varied data than what we have available in the fixtures file.

*/

import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'video-vault/tests/helpers/start-app';
import { login, logout } from 'video-vault/tests/helpers/login';

let application;

module('step-07: Fetching movies with Ember Data', {
  beforeEach: function() {
    application = startApp();
    login();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    logout();
  }
});

test('rendering the list of movie posters', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('.movie-grid-item:eq(1) img').attr('src'), '/movie-posters/ehObfVePRIGEfHaYKLG0fgMJoCB.jpg', "The second movie has the correct src attribute");
    assert.equal(find('.movie-grid-item:eq(3) img').attr('src'), '/movie-posters/gj282Pniaa78ZJfbaixyLXnXEDI.jpg', "The fourth movie has the correct src attribute");
    assert.equal(find('.movie-grid-item:eq(19) img').attr('src'), '/movie-posters/kBXgGUt07sLpw6rhpiYwEyOwUDa.jpg', "The last movie has the correct src attribute");
  });
});

test('rendering the details of a movie', function(assert) {
  visit('/');
  click('.movie-grid-item:last');

  andThen(function() {
    assert.elementHasContent(find('.media__title'), 'Fast & Furious 6');
    assert.elementHasContent(find('.tagline'), 'All roads lead to this');
    assert.elementHasContent(find('.overview'), 'Hobbs has Dominic and Brian reassemble their crew');
  });
});
