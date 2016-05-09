import Ember from 'ember';
import merge from 'ember-validation/utils/merge';
import { createError } from 'ember-validation/utils/error';

const { Logger, RSVP: { resolve, reject }, get, getProperties } = Ember;

const VALIDATOR_NAME = "string";

const defaultOptions = {
  "messages": {
    "default": "string.not_string",
    "out_of_range": "string.out_of_range",
    "less_then": "string.less_then",
    "greater_then": "string.greater_then",
    "not_equal": "string.not_equal"
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
  const value = get(context, attributeName);
  const { min, max, equal } = getProperties(options, "min", "max", "equal");

  Logger.log(`Validation : <<validator>> : '${VALIDATOR_NAME}' called on %s with options %o`, attributeName, options);

  if (Ember.isBlank(value)) { return resolve(); }

  if (Ember.typeOf(value) !== "string" || Ember.typeOf(value.toString) !== "function") {
    return reject( createError(get(options, "messages.default"), value, VALIDATOR_NAME) );
  }

  if (!Ember.isNone(min) && !Ember.isNone(max) && (value.length < min || value.length > max)) {
    return reject( createError(get(options, "messages.out_of_range"), value, VALIDATOR_NAME) );
  }

  if (!Ember.isNone(min) && value.length < min) {
    return reject( createError(get(options, "messages.less_then"), value, VALIDATOR_NAME) );
  }

  if (!Ember.isNone(max) && value.length > max) {
    return reject( createError(get(options, "messages.greater_then"), value, VALIDATOR_NAME) );
  }

  if (!Ember.isNone(equal) && value.length !== parseInt(equal)) {
    return reject( createError(get(options, "messages.not_equal"), value, VALIDATOR_NAME) );
  }

  return resolve();
}

export default validate;
