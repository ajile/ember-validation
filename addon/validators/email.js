import Ember from 'ember';
import Base from 'ember-validation/validators/base';

const { RSVP, get } = Ember;

export default Base.extend({

  message: "email_invalid",

  validate: function (attributeName, context) {
    const deferred = RSVP.defer();
    const value = get(context, attributeName);
    if (Ember.isBlank(value)) { deferred.resolve(); return deferred.promise; }
    value.search(/@/) === -1 ? deferred.reject(this.message) : deferred.resolve();
    return deferred.promise;
  }

});
