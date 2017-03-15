import Ember from 'ember';
import merge from 'ember-validation/utils/merge';
import Config from 'ember-validation/configuration';
import { createError } from 'ember-validation/utils/error';

/**
 * @module ember-validation/validators/regexp
 * @todo Cover this module by doc-comments
 */

const { Logger, RSVP: { defer }, get } = Ember;

const VALIDATOR_NAME = "regexp";

const defaultOptions = {
  "messages": {
    "default": "regexp.invalid"
  }
};

function validate(attributeName, context, options={}) {
  options = merge({}, defaultOptions, options);
  const deferred = defer();
  const value = get(context, attributeName);
  const regexp = get(options, "regexp");

  Config.LOG_VALIDATION && Logger.log(`Validation : <<validator>> : '${VALIDATOR_NAME}' called on %s with options %o`, attributeName, options);

  if (Ember.isBlank(value)) { deferred.resolve(); return deferred.promise; }

  Ember.assert("validators/regexp: options.regexp must be instance of RegExp", regexp instanceof RegExp);

  if (!regexp.test(value)) {
    var err = createError(get(options, "messages.default"), value, VALIDATOR_NAME);
    return deferred.reject(err), deferred.promise;
  }

  deferred.resolve();

  return deferred.promise;
}

export default validate;

