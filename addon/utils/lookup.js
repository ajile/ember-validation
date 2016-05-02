import Ember from 'ember';

/**
  Method looking validator by name.
  @module
  @function lookup
  @param {String} namespace
  @param {String} name
  @param {Ember.Container} container
  @return Validator
*/
export function lookup(namespace, name, container) {
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
  var preset = lookup("preset", name, container);
  Ember.assert(`Preset "${name}" is not found. You should put it into the presets directory.` +
               `See http://ajile.github.io/ember-validation/#/tutorial/presets/creating`,
               preset);
  return preset;

}
