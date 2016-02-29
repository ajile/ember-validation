import Ember from 'ember';
import Base from 'ember-validation/validators/base';

const { RSVP, get } = Ember;

export default Base.extend({

  validate: function (attributeName, context) {
    const deferred = RSVP.defer();
    const value = get(context, attributeName);
    if (Ember.isBlank(value)) { deferred.resolve(); return deferred.promise; }
    return deferred.promise;
  }

});
