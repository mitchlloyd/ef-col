/*
  The Index and About Page
  ----------------------------

  In this step you'll take the static markup in application.hbs and move it
  into 2 separate templates. You'll also create an about page for Video Vault.

  The markup for the header of Video Vault should always be rendered as the
  user navigates between pages.  Because it is always present, this markup
  should stay in application.hbs. The list of movies, however, will need to
  reside in a new index.hbs template.

  When visiting the root URL ('/') a user should still see the page header and
  the list of movies.

  Next, create an about page at '/about' for Video Vault. To accomplish this
  you'll need to modifiy the router.js file and create a new template called
  "about.hbs". You can put any content that you want on your about page, but
  to make the test pass you'll need an H1 tag with the word "About" in it.
*/

import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'video-vault/tests/helpers/start-app';
import { login, logout } from 'video-vault/tests/helpers/login';

let application;

module('step-01: Index and About pages', {
  beforeEach: function() {
    application = startApp();
    login();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    logout();
  }
});

test('showing the index page', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('.header .logo').length, 1, "page header is present");
    assert.equal(currentPath(), 'index', "showing the index page");
    assert.equal(currentURL(), '/', "URL is correct");
    assert.equal(find('.movie-grid-item').length, 20, "all movies are shown");
  });
});

test('showing the about page', function(assert) {
  visit('/about');

  andThen(function() {
    assert.equal(find('.header .logo').length, 1, "page header is present");
    assert.equal(currentURL(), '/about', "URL is correct");
    assert.ok(find('h1').text().match(/About/), "page has 'About' heading");
  });
});
