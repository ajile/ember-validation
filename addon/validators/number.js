import Ember from 'ember';
import merge from 'ember-validation/utils/merge';
import { createError } from 'ember-validation/utils/error';

const { Logger, RSVP: { resolve, reject }, get, getProperties } = Ember;

const VALIDATOR_NAME = "number";

const defaultOptions = {
  "messages": {
    "default": "number.not_number",
    "out_of_range": "number.out_of_range",
    "less_then": "number.less_then",
    "greater_then": "number.greater_then"
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
  const { min, max } = getProperties(options, "min", "max");

  var err = null;

  Logger.log(`Validation : <<validator>> : '${VALIDATOR_NAME}' called on %s with options %o`, attributeName, options);

  if (Ember.isBlank(value)) { return resolve(); }

  if (!isNumber(value)) {
    return reject( createError(get(options, "messages.default"), value, VALIDATOR_NAME) );
  }

  if (!Ember.isNone(min) && !Ember.isNone(max) && (value < min || value > max)) {
    return reject( createError(get(options, "messages.out_of_range"), value, VALIDATOR_NAME) );
  }

  if (!Ember.isNone(min) && value < min) {
    return reject( createError(get(options, "messages.less_then"), value, VALIDATOR_NAME) );
  }

  if (!Ember.isNone(max) && value > max) {
    return reject( createError(get(options, "messages.greater_then"), value, VALIDATOR_NAME) );
  }

  return resolve();
}

var isNumber = (data) => !isNaN(parseFloat(data));

export default validate;
export var isNumber;
