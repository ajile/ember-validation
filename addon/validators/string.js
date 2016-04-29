import Ember from 'ember';
import merge from 'ember-validation/utils/merge';

const { Logger, RSVP: { resolve, reject }, get, getProperties } = Ember;

const defaultOptions = {
  "messages": {
    "default": "not_string"
  }
};

/**
* @function
* @param {String} attributeName
* @param {Object} context
* @param {Object} options
* @returns {ember/RSVP.defer}
* @module
* @public
*/
function validate(attributeName, context, options={}) {
  options = merge({}, defaultOptions, options);
  const value = get(context, attributeName);
  const { min, max } = getProperties(options, "min", "max");

  Logger.log("Validation : <<validator>> : 'string' called on %s with options %o", attributeName, options);

  if (Ember.isBlank(value)) { return resolve(); }

  if (Ember.typeOf(value) === "string" || Ember.typeOf(value.toString) === "function") {
    return resolve();
  } else {
    var err = createError(get(options, "messages.default"), value);
    return reject(err);
  }
}

export default validate;
