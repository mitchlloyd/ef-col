import Ember from 'ember';

Ember.Test.registerAsyncHelper('mousemove', function(app, selector) {
  var $el = findWithAssert(selector);

  // this seems really strange, but is required to make the helper work
  return new Ember.RSVP.Promise(function(resolve) {
    Ember.run(function() {
      $el.trigger($.Event("mousemove", {}));
      resolve();
    });
  });
});
