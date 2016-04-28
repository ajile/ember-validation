import Ember from 'ember';
import merge from 'ember-validation/utils/merge';

const { Logger, RSVP: { defer }, get, getProperties } = Ember;

const defaultOptions = {
  "messages": {
    "out_of_range": "out_of_range"
  }
};

/**
* @function
* @param {String} attributeName
* @param {Object} context
* @param {Object} options
* @returns {ember/RSVP.defer}
* @module
* @public
*/
function validate(attributeName, context, options={}) {
  options = merge({}, defaultOptions, options);
  const deferred = defer();
  const value = get(context, attributeName);
  const { min, max } = getProperties(options, "min", "max");

  Logger.info("Validation : <<validator>> : 'string' called on %s with options %o", attributeName, options);

  if (Ember.isBlank(value)) { deferred.resolve(); return deferred.promise; }

  deferred.resolve();

  return deferred.promise;
}

export default validate;

