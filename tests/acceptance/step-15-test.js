/*

  Authentication
  --------------

  For this step, the training wheels are coming off! You're going to write
  your own test to require that users login before they watch movies.

  First head to the /server/utils/authentication-store.js file
  and uncomment the marked code to enable authentication.

  Here is the first test I would write:

  Given I am not logged in
  When I visit '/'
  Then I should be redirected to '/login'

  How would one "redirect" in Ember and how will we know when we ought
  to redirect? In this case we'll let the server be our guide. If we
  ask for data and the server returns a 403 response, we'll `transitionTo`
  the login route.

  You can handle global http errors like 403 responses by adding an `error`
  action to your application route. When handling this error you can
  `transitionTo` any route in your application.

  Next I would write a test for a successfull login:

  Given I am not logged in
  When I visit '/login'
  And I fill in my email
  And I fill in a password of 'password'
  Then I should see the list of movies

  The server is setup to let anyone authenticate as long as the given
  password is 'password'.

  You can login to the server by sending an email and password to this
  endpoint:

    POST '/api/sessions'

  I wouldn't use Ember Data for this and instead use the 'ic-ajax' library
  that comes with Ember CLI. The response from this endpoint will include a
  token. If you set that token as `token` in localStorage, the application
  adapter will dutifully pick it up and send it with each Ember Data request
  to the server. See /app/adapters/application for this functionality.

  Naturally the next test should be for a failed login:

  Given I am not logged in
  When I visit '/login'
  And I fill in my email
  And I fill in a password of 'invalid'
  Then I should see an error message
  And I should not see the list of movies

  We probably won't tackle logout, but what would be the steps to
  log a user out?

  Here is some suggested markup for the login form to make it look nice
  with the provided CSS:

    <h2>Login</h2>

    <!-- only show if there is an error -->
    <div class="login-error">
      Sorry, could not log you in.
    </div>

    <input type="email">
    <input type="password">
    <button class="login">Login</button>

*/

import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'video-vault/tests/helpers/start-app';

let application;

module('step-15: Authentication', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});
