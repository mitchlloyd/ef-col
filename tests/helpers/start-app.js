import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';

export default function startApp(attrs) {
  var application;

  var attributes = Ember.merge({}, config.APP);
  attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

  Ember.run(function() {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  // Stub out userActivity service
  let userActivity = application.registry.lookup('service:user-activity');

  if (userActivity) {
    userActivity.setProperties({
      isActive: true,
      init() {}
    });
  }

  return application;
}
