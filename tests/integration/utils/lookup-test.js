import { run } from '@ember/runloop';
import { typeOf } from '@ember/utils';

import { module, test } from 'qunit';
import lookup from '../../../utils/lookup';
import startApp from '../../helpers/start-app';

module('Integration | Utility | lookup', {
  integration: true,
  beforeEach: function () {
    this.app = startApp();
  },
  afterEach: function () {
    run(this.app, 'destroy');
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
  app.register(`validator:${name}`, validatorFunction);
  let validator = lookup.lookupValidator(name, container);

  assert.ok(typeOf(validator) === "function", "Function returns validator from registry by name");
});
