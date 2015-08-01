/* globals QUnit */

/*

  Saving Movie Position
  ---------------------

  Right now, if we're watching a movie our app does not keep track
  of how far we are into our movie. In this step we're going to change
  that. As the time on the video increments we'll save the position
  of our movie to the server. Then when we show the video, we'll
  start playing it at the correct position.

  First we need our video-player component to send an onTimeUpdate
  action with the current position of the video. The video element will
  send a 'timeupdate' event when the time increments. We need to setup
  a callback for this event.

  https://developer.mozilla.org/en-US/docs/Web/Events/timeupdate

  Then we need to handle this action in the play route to update the movie
  model and save it to the server.

  Finally when we setup the video-player component we need to give it
  the position to start at in order to create a URL with a Media Fragment
  URI.

  See this documentaiton for an overview of this browser feature:
  https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_HTML5_audio_and_video#Specifying_playback_range

  Some points to consider:

  * When is the right time to add this timeupdate handler?
  * When is the right time to cleanup the timeupdate handler?
  * What happens when the movie position updates while we watch a video?
  * How can we get more fine-grained control over the updates to the video src attribute?

*/

import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import { module } from 'qunit';
import FakeServer, { stubRequest } from 'ember-cli-fake-server';
import hbs from 'htmlbars-inline-precompile';
import startApp from 'video-vault/tests/helpers/start-app';
import { login, logout } from 'video-vault/tests/helpers/login';

let originalTestTimeout;

moduleForComponent('video-player', 'step-14a: Sending onTimeUpdate', {
  integration: true,

  beforeEach() {
    originalTestTimeout = QUnit.config.testTimeout;
    QUnit.config.testTimeout = 1000;
  },

  afterEach() {
    QUnit.config.testTimeout = originalTestTimeout;
  }
});

test('sending onTimeUpdate actions', function(assert) {
  let done = assert.async();

  this.set('video', '/api/videos/bbb.mp4');
  this.set('userActivity', { isActive: true });

  this.set('onTimeUpdate', function(position) {
    assert.ok(position > 0, 'position is a non zero number');
    done();
  });

  this.render(
    hbs`{{video-player src=video
                       userActivity=userActivity
                       onTimeUpdate=onTimeUpdate}}`
  );

  this.$('video')[0].play();
});

let application;

module('step-14b: Saving the movie position', {
  beforeEach() {
    FakeServer.start();
    application = startApp();
    login();

    originalTestTimeout = QUnit.config.testTimeout;
    QUnit.config.testTimeout = 1000;
  },

  afterEach() {
    FakeServer.stop();
    Ember.run(application, 'destroy');
    logout();

    QUnit.config.testTimeout = originalTestTimeout;
  }
});

test('saving the movie position', function(assert) {
  let done = assert.async();

  stubRequest('get', '/api/movies/157336', function() {
    return this.success({
      movie: {
        id: 157336,
        video: '/api/videos/bbb.mp4',
        release_date: '2015-01-01'
      }
    });
  });

  stubRequest('put', '/api/movies/157336', function(request) {
    let payload = JSON.parse(request.requestBody);
    assert.ok(payload.movie.position > 0, "position was sent to server");
    done();
    return this.success({});
  });

  visit('/movie/157336/play');

  andThen(function() {
    find('video')[0].play();
  });
});

test('starting from the correct movie position', function(assert) {
  stubRequest('get', '/api/movies/157336', function() {
    return this.success({
      movie: {
        id: 157336,
        video: '/api/videos/bbb.mp4',
        release_date: '2015-01-01',
        position: 10
      }
    });
  });

  visit('/movie/157336/play');

  andThen(function() {
    assert.equal(find('video').attr('src'), '/api/videos/bbb.mp4#t=10', "The correct src attribute was set");
  });
});
