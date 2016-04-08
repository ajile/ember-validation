import Ember from 'ember';

const { RSVP: { defer }, get } = Ember;

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
  const deferred = defer();
  const value = get(context, attributeName);
  const regexp = get(options, "regexp");

  if (Ember.isBlank(value)) { deferred.resolve(); return deferred.promise; }

  Ember.assert("validators/regexp: options.regexp must be instance of RegExp", regexp instanceof RegExp);

  if (!regexp.test(value)) {
    return deferred.reject(get(options, "messages.default")), deferred.promise;
  }

  deferred.resolve();

  return deferred.promise;
}

export default validate;

