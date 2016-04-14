import Ember from 'ember';

const { Logger, RSVP: { defer }, get, getProperties, merge } = Ember;

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
  options = Ember.$.extend({}, defaultOptions, options);
  const deferred = defer();
  const value = get(context, attributeName);
  const { min, max } = getProperties(options, "min", "max");

  Logger.info("Validation : <<validator>> : 'string' called on %s with options %o", attributeName, options);

  if (Ember.isBlank(value)) { deferred.resolve(); return deferred.promise; }
  console.log('length', value.length, 'min', min, 'max', max)
  if (!Ember.isNone(min) && value.length < min) {console.log('---> validate min')
    return deferred.reject(get(options, "messages.out_of_range")), deferred.promise;
  }

  if (!Ember.isNone(max) && value.length > max) {console.log('---> validate max')
    return deferred.reject(get(options, "messages.out_of_range")), deferred.promise;
  }

  deferred.resolve();

  return deferred.promise;
}

export default validate;

