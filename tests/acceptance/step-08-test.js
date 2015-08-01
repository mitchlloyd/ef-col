/*

  The Play Route
  --------------

  Before we embark our a journey with components, we're going to add
  one more link and route to our application. When a user clicks on the
  movie poster on the movie page, we want to render a new nested template.

  The URL for this page should look like this:

    /movie/abc123/play

  And the url that shows the details of your movie should continue to look
  like this:

    /movie/abc123

  There are a few different ways to accomplish this, but we probably want
  to replace the UI that shows the movie with the UI that plays the movie
  when the URL changes.

  Inside of your template for this route, render a video element
  with the source attribute set to the movie video URL. We want to be able
  to play the video so don't forget to add the `controls` property to the
  element.

*/

import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'video-vault/tests/helpers/start-app';
import { login, logout } from 'video-vault/tests/helpers/login';

let application;

module('step-08: The play route', {
  beforeEach: function() {
    application = startApp();
    login();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    logout();
  }
});

test('rendering the play template', function(assert) {
  visit('/');
  click('.movie-grid-item:first');
  click('.movie-detail img');

  andThen(function() {
    assert.equal(currentURL(), '/movie/157336/play', "Using the correct URL");
    assert.equal(find('video').length, 1, "Showing the video");
    assert.ok(find('video:first').attr('src').match('/api/videos/bbb.mp4'), "Setting the video src attribute");
    assert.ok(find('video:first').prop('controls'), "The controls are showing");
  });
});
