/*

  Hiding Controls
  ---------------

  Now that we have a good way to tell if the user is actively using
  the app, let's use our service to hide the controls when the user
  is not active. We'll inject our service into the video-player
  component and hide both the X button and the native controls
  when the user is no longer interacting with the application.

*/

import Ember from 'ember';
import {
  moduleForComponent,
  test
} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('video-player', 'step-11: Hiding video-player controls', {
  integration: true
});

test('controls are shown when the user is active' , function(assert) {
  let userActivity = Ember.Object.create({ isActive: true });
  this.set('userActivity', userActivity);

  this.render(hbs`{{video-player userActivity=userActivity}}`);

  assert.equal(this.$('.video-player__close').length, 1, "Has the close button");
  assert.ok(this.$('video').prop('controls'), "Has the native controls");
});

test('controls are hidden when the user is not active' , function(assert) {
  let userActivity = Ember.Object.create({ isActive: false });
  this.set('userActivity', userActivity);

  this.render(hbs`{{video-player userActivity=userActivity}}`);

  assert.equal(this.$('.video-player__close').length, 0, "Has no close button");
  assert.notOk(this.$('video').prop('controls'), "Has no controls");
});
