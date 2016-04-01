import Ember from 'ember';

/**
  Method looking validator by name.
  @module
  @function lookup
  @param {String} name
  @param {Ember.Container} container
  @return Validator
*/
export default function(name, container) {
  let validator = null;
  Ember.assert("An application container should be provided", container);
  Ember.assert("Provide a validator name", !Ember.isEmpty(name));
  validator = container.lookup('validator:' + name);
  Ember.assert(`Validator "${name}" is not found. You should put it into the validators directory.` +
               `See http://ajile.github.io/ember-validation/#/tutorial/validators/creating`,
               Ember.typeOf(validator) === "function");
  return validator;
}
