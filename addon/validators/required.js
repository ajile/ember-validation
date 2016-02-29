import Ember from 'ember';
import Base from 'ember-validation/validators/base';

const { RSVP, get } = Ember;

export default Base.extend({

  validate: function (attributeName, context) {
    const deferred = RSVP.defer();
    const value = get(context, attributeName);
    Ember.isBlank(value) ? deferred.reject(this.message) : deferred.resolve();
    return deferred.promise;
  }

});
