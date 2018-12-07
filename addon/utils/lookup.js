import Ember from 'ember';
import Config from 'ember-validation/configuration';

/**
 * @module ember-validation/utils/lookup
 */

/**
  Method looking validator by name.
  @function lookup
  @param {String} namespace
  @param {String} name
  @param {Ember.Container} container
  @return Validator
*/
export function lookup(namespace, name, container) {
  Config.LOG_VALIDATION && console.log("Lookup : <<util>> : lookup:", container);
  let validator = null;
  Ember.assert("An application container should be provided", container);
  Ember.assert("Provide a validator name", !Ember.isEmpty(name));
  validator = container.lookup(namespace + ':' + name);
  return validator;
}

/**
  Method looking validator by name.
  @module
  @function lookupValidator
  @param {String} name
  @param {Ember.Container} container
  @return Validator
*/
export function lookupValidator(name, container) {
  Config.LOG_VALIDATION && console.log("Lookup : <<util>> : lookupValidator:", name, container);
  var validator = lookup("validator", name, container);
  Ember.assert(`Validator "${name}" is not found. You should put it into the validators directory.` +
               `See http://ajile.github.io/ember-validation/#/tutorial/validators/creating`,
               Ember.typeOf(validator) === "function");
  return validator;

}

/**
  Method looking validator by name.
  @module
  @function lookupPreset
  @param {String} name
  @param {Ember.Container} container
  @return Validator
*/
export function lookupPreset(name, container) {
  Config.LOG_VALIDATION && console.log("Lookup : <<util>> : lookupPreset:", container);
  var preset = lookup("preset", name, container);
  Ember.assert(`Preset "${name}" is not found. You should put it into the presets directory.` +
               `See http://ajile.github.io/ember-validation/#/tutorial/presets/creating`,
               preset);
  return preset;

}
