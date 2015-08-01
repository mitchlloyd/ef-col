/*
  The Route Model Hook
  --------------------

  In this step you will create an Index Route to load your data when the
  '/' path is visited.

  Once you create your route, you'll need to import the fixture data into the
  file using the `import` syntax. You can find this fixture data in
  `app/models/fixtures/movies.js`.  When you return these movie from your
  route's model hook, the array will be available in your index template as
  `model`.

  Finally, you can get this test passing by showing the unknown number of
  movies in the `index.hbs` template with this handlebars snippet:

     <p class="movie-count">{{model.length}} movies</p>

*/

import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'video-vault/tests/helpers/start-app';
import { login, logout } from 'video-vault/tests/helpers/login';

let application;

module('step-03: Loading movies in a route', {
  beforeEach: function() {
    application = startApp();
    login();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    logout();
  }
});

test('the index pages shows the total number of movies', function(assert) {
  visit('/');

  andThen(function() {
    let movieCount = findWithAssert('.movie-count').text().trim();
    assert.equal(movieCount, "20 movies", "the movie count is correct");
  });
});
