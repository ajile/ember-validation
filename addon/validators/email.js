import Ember from 'ember';
import merge from 'ember-validation/utils/merge';
import Config from 'ember-validation/configuration';
import { createError } from 'ember-validation/utils/error';

const { Logger, RSVP: { resolve, reject }, get } = Ember;

const VALIDATOR_NAME = "email";

const defaultOptions = {
  "messages": {
    "default": "email.invalid"
  }
};

/**
  @module
  @public
*/
function validate(attributeName, context, options={}) {
  options = merge({}, defaultOptions, options);
  const value = get(context, attributeName);
  if (Ember.isBlank(value)) { return resolve(); }

  Config.LOG_VALIDATION && Logger.log(`Validation : <<validator>> : '${VALIDATOR_NAME}' called on %s with options %o`, attributeName, options);

  const reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (reg.test(value)) {
    return resolve();
  }

  return reject(createError(get(options, "messages.default"), value, VALIDATOR_NAME));
}

export default validate;
