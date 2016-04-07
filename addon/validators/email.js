import Ember from 'ember';

const { RSVP, get, merge } = Ember;

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
  options = merge(defaultOptions, options)
  const deferred = RSVP.defer();
  const value = get(context, attributeName);
  if (Ember.isBlank(value)) { deferred.resolve(); return deferred.promise; }

  const reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  reg.test(value) ? deferred.resolve() : deferred.reject(get(options, "messages.default"));

  return deferred.promise;
};

export default validate;
