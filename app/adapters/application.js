import DS from 'ember-data';
import Ember from 'ember';
const { computed } = Ember;
const store = window.localStorage;

export default DS.RESTAdapter.extend({
  namespace: 'api',

  headers: computed('session.token', function() {
    return {
      "AUTH_TOKEN": store.getItem('token')
    };
  })
});
