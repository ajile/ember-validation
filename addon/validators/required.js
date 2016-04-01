import Ember from 'ember';

const { RSVP: {resolve, reject}, get, isBlank } = Ember;

/**
  @module
  @public
*/
function validate(attributeName, context, options) {
  const value = get(context, attributeName);
  return isBlank(value) ? reject(get(options, "messages.default")) : resolve();
};

export default validate;
