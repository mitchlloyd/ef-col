/*

  Duration Helper
  ---------------

  Each of our movies has a runtime value showing how many minutes long
  the movie is. We'll show this value in our template and use a helper
  to format the value correctly.

  First define a helper called `duration` to perform this formatting
  work. The add another field to the details of your movie that looks
  like this:

    <p class="runtime">Runtime: <!-- duration of the movie --></p>

*/

import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'video-vault/tests/helpers/start-app';
import { login, logout } from 'video-vault/tests/helpers/login';
import duration from 'video-vault/helpers/duration';

module('step-13a: duration helper');

test('formatting movie times', function(assert) {
  assert.equal(duration.compute([100]), '1:40');
  assert.equal(duration.compute([40]), '0:40');
  assert.equal(duration.compute([62]), '1:02');
});

let application;

module('step-13b: movie durations', {
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
    assert.equal(find('.runtime').text().trim(), 'Runtime: 2:49', "shows the formatted movie runtime");
  });
});
