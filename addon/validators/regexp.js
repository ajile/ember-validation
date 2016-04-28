import Ember from 'ember';
import merge from 'ember-validation/utils/merge';
import { createError } from 'ember-validation/utils/error';

const { RSVP: { defer }, get } = Ember;

const defaultOptions = {
  "messages": {
    "default": "required"
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
  const regexp = get(options, "regexp");

  if (Ember.isBlank(value)) { deferred.resolve(); return deferred.promise; }

  Ember.assert("validators/regexp: options.regexp must be instance of RegExp", regexp instanceof RegExp);

  if (!regexp.test(value)) {
    var err = createError(get(options, "messages.default"), value, options);
    return deferred.reject(err), deferred.promise;
  }

  deferred.resolve();

  return deferred.promise;
}

export default validate;

