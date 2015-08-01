/*

  User Activity
  -------------

  Our on-screen controls are nice, but we don't want to see them the
  whole time we're watching a movie. Ideally these controls would
  disappear after awhile and reappear when we started interacting with
  the app again.

  The information about whether or not a user is active is global to our
  application, and it's easy to see how we may want this information
  in different contexts. Also the fact that we'll rely on a browser global
  (document) and use some delayed asynchronous action all makes this a
  great candidate for a service, which can easily be stubbed out in
  a test.

  We'll construct a `user-activity` service that will tell us whether
  or not the user is active. Once you finish this step, you'll have a
  better understanding of why we would want to wrap something like
  this in an Ember service.

  There are quite a few tricky things that come into play as we begin
  to interface with asynchronous browser APIs in the user-activity service.
  Some tools in your arsenal include:

  * Ember Object's `init` method. The service is lazily instantiated when it is
    called and you can override the init method to register event listeners.

    init() {
      this._super(...arguments); // Important!
      ...
    }

  * `Ember.run.bind(this, 'methodName')` - Will call a method on the current
    object using the Ember run loop.

  * Ember Object's `willDestroy` hook. This method will be called when the
    service is about to be destroyed. For testing, we'll need to remove any
    event listeners in this hook.

  * `Ember.run.debounce(this, 'methodName', delay)`. This function will wait
    to call a method until the function has not been been called in the delay
    period. Hard to explain but useful in a lot of situations.

  * Ember CLI's environment file. You'll find a `userActivity` property in
    this file. This will allow us to use a very short delay in testing and
    a more reasonable delay in production and development evironments.

*/

import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import UserActivity from 'video-vault/services/user-activity';

let userActivity;

module('step-10: User Activity Service', {
  beforeEach() {
    userActivity = UserActivity.create();
  },

  afterEach() {
    Ember.run(userActivity, 'destroy');
  }
});

test('isActive' , function(assert) {
  let done = assert.async();

  assert.notOk(userActivity.isActive, "initially, user is not active");

  Ember.$(document).trigger('mousemove');

  assert.ok(userActivity.isActive, "then the user is active");

  Ember.run.later(function() {
    assert.notOk(userActivity.isActive, "later the user is inactive");
    done();
  });
});
