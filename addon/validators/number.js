import Ember from 'ember';
import merge from 'ember-validation/utils/merge';
import { createError } from 'ember-validation/utils/error';

const { Logger, RSVP: { defer }, get, getProperties } = Ember;

const defaultOptions = {
  "messages": {
    "not_number": "not_number",
    "out_of_range": "out_of_range"
  }
};

/**
  @module
  @public
*/
function validate(attributeName, context, options={}) {
  options = merge({}, defaultOptions, options);
  const deferred = defer();
  const value = get(context, attributeName);
  const { min, max } = getProperties(options, "min", "max");

  Logger.info("Validation : <<validator>> : 'number' called on %s with options %o", attributeName, options);

  if (Ember.isBlank(value)) { deferred.resolve(); return deferred.promise; }

  if (!isNumber(value)) {
    var err = createError(get(options, "messages.not_number"), value, options);
    return deferred.reject(err), deferred.promise;
  }

  if (!Ember.isNone(min) && value < min) {
    var err = createError(get(options, "messages.out_of_range"), value, options);
    return deferred.reject(err), deferred.promise;
  }

  if (!Ember.isNone(max) && value > max) {
    var err = createError(get(options, "messages.out_of_range"), value, options);
    return deferred.reject(err), deferred.promise;
  }

  deferred.resolve();

  return deferred.promise;
}

var isNumber = (data) => !isNaN(parseFloat(data));

export default validate;
export var isNumber;
