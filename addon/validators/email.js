import Ember from 'ember';
import merge from 'ember-validation/utils/merge';

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
  options = merge({}, defaultOptions, options);
  const deferred = RSVP.defer();
  const value = get(context, attributeName);
  if (Ember.isBlank(value)) { deferred.resolve(); return deferred.promise; }

  Logger.info("Validation : <<validator>> : 'email' called on %s with options %o", attributeName, options);

  const reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  reg.test(value) ? deferred.resolve() : deferred.reject(get(options, "messages.default"), "Validator `email` rejects the promise");

  return deferred.promise;
}

export default validate;
