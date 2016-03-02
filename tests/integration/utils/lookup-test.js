import Ember from 'ember';
import { module, test } from 'qunit';
import lookup from '../../../utils/lookup';
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
test('it works', function(assert) {

  const app = this.app;
  const container = app.__container__;

  assert.throws(() => lookup(), "Throws an error when no name nor container");
  assert.throws(() => lookup("", container), "Throws an error when name wrong");
  assert.throws(() => lookup(null, container), "Throws an error when name wrong");
  assert.throws(() => lookup(undefined, container), "Throws an error when name wrong");
  assert.throws(() => lookup("aaaa", "Throws an error when name wrong and no container"));
  assert.throws(() => lookup("imaginary-validator", container), "Throws an error when validator not found");

  const name = "test";
  const ValidatorClass = Ember.Object.extend({ name: "TEST_VALIDATOR" });
  container._registry.register(`validator:${name}`, ValidatorClass);
  let Validator = lookup(name, container);

  assert.ok(Validator.create() instanceof ValidatorClass, "Function returns validator from registry by name");
});
