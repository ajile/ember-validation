import Ember from 'ember';
import merge from 'ember-validation/utils/merge';

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
  Logger.info("Validation : <<validator>> : 'required' called on %s with options %o", attributeName, options);
  return isBlank(value) ? reject(get(options, "messages.default"), "Validator `required` rejects the promise") : resolve();
}

export default validate;
