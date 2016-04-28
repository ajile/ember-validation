import Ember from 'ember';
import merge from 'ember-validation/utils/merge';
import { createError } from 'ember-validation/utils/error';

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

  if (reg.test(value)) {
    deferred.resolve();
  } else {
    var err = createError(get(options, "messages.default"), value, options);
    deferred.reject(err);
  }

  return deferred.promise;
}

export default validate;
