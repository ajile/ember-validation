import Ember from 'ember';
import merge from 'ember-validation/utils/merge';
import { createError } from 'ember-validation/utils/error';

const { Logger, RSVP: { resolve, reject }, get, getProperties } = Ember;

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
  const value = get(context, attributeName);
  const { min, max } = getProperties(options, "min", "max");

  var err = null;

  Logger.log("Validation : <<validator>> : 'number' called on %s with options %o", attributeName, options);

  if (Ember.isBlank(value)) {
    return resolve();
  }

  if (!isNumber(value)) {
    err = createError(get(options, "messages.not_number"), value);
  }

  if (!Ember.isNone(min) && value < min) {
    err = createError(get(options, "messages.out_of_range"), value);
  }

  if (!Ember.isNone(max) && value > max) {
    err = createError(get(options, "messages.out_of_range"), value);
  }

  return err ? reject(err) : resolve;
}

var isNumber = (data) => !isNaN(parseFloat(data));

export default validate;
export var isNumber;
