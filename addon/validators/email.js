import Ember from 'ember';

const { RSVP, get } = Ember;

/**
  @module
  @public
*/
function validate(attributeName, context) {
  const deferred = RSVP.defer();
  const value = get(context, attributeName);
  if (Ember.isBlank(value)) { deferred.resolve(); return deferred.promise; }
  value.search(/@/) === -1 ? deferred.reject(get(options, "messages.default")) : deferred.resolve();
  return deferred.promise;
};

export default validator;
