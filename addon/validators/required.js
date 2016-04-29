import Ember from 'ember';
import merge from 'ember-validation/utils/merge';
import { createError } from 'ember-validation/utils/error';

const { Logger, RSVP: { resolve, reject }, get, isBlank } = Ember;

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
  Logger.log("Validation : <<validator>> : 'required' called on %s with options %o", attributeName, options);

  if (isBlank(value)) {
    var err = createError(get(options, "messages.default"), value);
    return reject(err);
  }

  return resolve();
}

export default validate;
