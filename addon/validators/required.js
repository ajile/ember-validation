import Ember from 'ember';

const { RSVP: {resolve, reject}, get, isBlank, Logger, merge } = Ember;

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
  options = merge(defaultOptions, options)
  const value = get(context, attributeName);
  Logger.info('Validation : Validator : required called on %s with options', attributeName, options);
  return isBlank(value) ? reject(get(options, "messages.default")) : resolve();
};

export default validate;
