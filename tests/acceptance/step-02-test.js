/*
  Creating Simple Links
  ---------------------

  In this step you'll use the `link-to` helper to make simple anchor tags to
  navigate between the index and about pages.

  Place these links inside of the nav.page-nav element in the application.hbs
  template.
*/

import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'video-vault/tests/helpers/start-app';
import { login, logout } from 'video-vault/tests/helpers/login';

let application;

module('step-02: Linking to Index and About pages', {
  beforeEach: function() {
    application = startApp();
    login();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    logout();
  }
});

test('linking to the about page from the index page', function(assert) {
  visit('/');
  click('a[href="/about"]');

  andThen(function() {
    assert.equal(currentURL(), '/about', "user navigates to the about page");
  });
});

test('linking to the index page from the about page', function(assert) {
  visit('/');
  click('a[href="/"]');

  andThen(function() {
    assert.equal(currentURL(), '/', "user navigates to the index page");
  });
});
