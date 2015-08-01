/*

  The video-player component
  --------------------------

  As we continue to work on Video Vault we'll want a lot of control over the
  interactions of the video player. Because of this, we'll create a new
  component called video-player.

  The first bit of additional UI we'll add is an obvious way to exit the video:
  an X button in the top right that takes us back to the movie route.

  Render the new video-player component inside of your play template. At this
  point all of the previous tests should continue to pass. Add the class
  'video-player' to your component to take advantage of the provided CSS
  styles.

  Next you should render the X button inside of video-player component. The
  markup should look like this:

    <button class="video-player__close">×</button>

  When the user clicks on this element you should send an "onClose" action which will
  send the user back to the movie route.

*/

import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'video-vault/tests/helpers/start-app';
import { login, logout } from 'video-vault/tests/helpers/login';

let application;

module('step-09: Closing the video', {
  beforeEach: function() {
    application = startApp();
    login();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    logout();
  }
});

test('exiting a movie' , function(assert) {
  visit('/movie/157336/play');
  click('.video-player__close');

  andThen(function() {
    assert.equal(currentURL(), '/movie/157336', "The user was sent back to the movie route");
  });
});
