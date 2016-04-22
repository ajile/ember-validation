import Ember from 'ember';

const { Logger, RSVP: {resolve, reject}, get, isBlank } = Ember;

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
  options = $.extend({}, defaultOptions, options);
  const value = get(context, attributeName);
  Logger.info("Validation : <<validator>> : 'required' called on %s with options %o", attributeName, options);
  return isBlank(value) ? reject(get(options, "messages.default")) : resolve();
}

export default validate;
