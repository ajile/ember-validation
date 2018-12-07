import Ember from 'ember';
import { module, test } from 'qunit';
import lookup from '../../../utils/lookup';
import startApp from '../../helpers/start-app';
import { setupTest } from 'ember-qunit';

module('Integration | Utility | lookup', {
  integration: true,
  beforeEach: function () {
    this.app = startApp();
  },
  afterEach: function () {
    Ember.run(this.app, 'destroy');
  }
});

// Replace this with your real tests.
test('lookupValidator works', function(assert) {

  const app = this.app;
  const container = app.__container__;

  assert.throws(() => lookup.lookupValidator(), "Throws an error when no name nor container");
  assert.throws(() => lookup.lookupValidator("", container), "Throws an error when name wrong");
  assert.throws(() => lookup.lookupValidator(null, container), "Throws an error when name wrong");
  assert.throws(() => lookup.lookupValidator(undefined, container), "Throws an error when name wrong");
  assert.throws(() => lookup.lookupValidator("aaaa", "Throws an error when name wrong and no container"));
  assert.throws(() => lookup.lookupValidator("imaginary-validator", container), "Throws an error when validator not found");

  const name = "test";
  const validatorFunction = () => {};
  container._registry.register(`validator:${name}`, validatorFunction);
  let validator = lookup.lookupValidator(name, container);

  assert.ok(Ember.typeOf(validator) === "function", "Function returns validator from registry by name");
});
