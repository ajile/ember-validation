import Ember from 'ember';
import { module, test } from 'qunit';
import { lookupValidator } from '../../../utils/lookup';
import startApp from '../../helpers/start-app';

module('Integration | Utility | lookup', {
  integration: true,
  setup: function () {
    this.app = startApp();
  },
  teardown: function () {
    Ember.run(this.app, 'destroy');
  }
});

// Replace this with your real tests.
test('lookupValidator works', function(assert) {

  const app = this.app;
  const container = app.__container__;

  assert.throws(() => lookupValidator(), "Throws an error when no name nor container");
  assert.throws(() => lookupValidator("", container), "Throws an error when name wrong");
  assert.throws(() => lookupValidator(null, container), "Throws an error when name wrong");
  assert.throws(() => lookupValidator(undefined, container), "Throws an error when name wrong");
  assert.throws(() => lookupValidator("aaaa", "Throws an error when name wrong and no container"));
  assert.throws(() => lookupValidator("imaginary-validator", container), "Throws an error when validator not found");

  const name = "test";
  const validatorFunction = () => {};
  container._registry.register(`validator:${name}`, validatorFunction);
  let validator = lookupValidator(name, container);

  assert.ok(Ember.typeOf(validator) === "function", "Function returns validator from registry by name");
});
