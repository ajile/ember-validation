import Ember from 'ember';

const { RSVP: { defer }, get, getProperties } = Ember;

/**
  @module
  @public
*/
function validate(attributeName, context, options={}) {
  const deferred = defer();
  const value = get(context, attributeName);
  const { min, max } = getProperties(options, "min", "max");

  if (Ember.isBlank(value)) { deferred.resolve(); return deferred.promise; }
  if (!isNumber(value)) {
    return deferred.reject(get(options, "messages.not_number")), deferred.promise;
  }

  if (!Ember.isNone(min) && value < min) {
    return deferred.reject(get(options, "messages.out_of_range")), deferred.promise;
  }

  if (!Ember.isNone(max) && value > max) {
    return deferred.reject(get(options, "messages.out_of_range")), deferred.promise;
  }

  deferred.resolve();

  return deferred.promise;
};

var isNumber = (data) => !isNaN(parseFloat(data));

export default validate;
export var isNumber;
