import error from '../../../utils/error';
import ErrorClass from 'ember-validation/core/error';
import { module, test } from 'qunit';

module('Unit | Utility | error');

// Replace this with your real tests.
test('it works', function(assert) {
  const ATTR_KEY = "an-attr-key";
  const ATTR_VALUE = "an attr value";

  var err = error.createError(ATTR_KEY, ATTR_VALUE);

  assert.ok(err instanceof ErrorClass, "It returns an validation error object");
  assert.equal(err.key, ATTR_KEY, "The error object has a key");
  assert.equal(err.value, ATTR_VALUE, "The error object has a value");
});
