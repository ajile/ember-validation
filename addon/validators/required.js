import Ember from 'ember';
import merge from 'ember-validation/utils/merge';
import { createError } from 'ember-validation/utils/error';

const { Logger, RSVP: { resolve, reject }, get, isBlank } = Ember;

const VALIDATOR_NAME = "required";

const defaultOptions = {
  "messages": {
    "default": "required"
  }
};

/**
  @module
  @public
*/
function validate(attributeName, context, options={}) {
  options = merge({}, defaultOptions, options);
  const value = get(context, attributeName);

  Logger.log(`Validation : <<validator>> : '${VALIDATOR_NAME}' called on %s with options %o`, attributeName, options);

  if (isBlank(value)) {
    return reject(createError(get(options, "messages.default"), value, VALIDATOR_NAME));
  }

  return resolve();
}

export default validate;
