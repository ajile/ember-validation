import Ember from 'ember';

/**
  Method looking validator by name.
  @function lookup
  @param {String} name
  @param {Ember.Container} container
  @return Validator
*/
export default function(name, container) {
  let validator = null;
  Ember.assert("An application container should be provided", container);
  validator = container.lookupFactory('validator:' + name);
  Ember.assert("Validator named '" + name + "' is not found", validator);
  return validator
};
