import Ember from 'ember';

const { Logger, RSVP, get } = Ember;

const defaultOptions = {
  "messages": {
    "default": "email_invalid"
  }
};

/**
  @module
  @public
*/
function validate(attributeName, context, options={}) {
  options = $.extend({}, defaultOptions, options);
  const deferred = RSVP.defer();
  const value = get(context, attributeName);
  if (Ember.isBlank(value)) { deferred.resolve(); return deferred.promise; }

  Logger.info("Validation : <<validator>> : 'email' called on %s with options %o", attributeName, options);

  const reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  reg.test(value) ? deferred.resolve() : deferred.reject(get(options, "messages.default"));

  return deferred.promise;
}

export default validate;
