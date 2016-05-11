import Ember from 'ember';
import { module, test } from 'qunit';
import validate from 'ember-validation/validators/number';
import Error from 'ember-validation/core/error';

module('Unit | Validator | number');

test('it works', function(assert) {

  expect(7);

  var user = Ember.Object.create({
    empty: "",
    firstName: "Vladimir",
    lastName: "Milkov",
    age: 0
  });

  var messages = {
    "not_number": "number.not_number"
  };

  assert.throws(() => validate(), "Throws an error when attribute name not provided");
  assert.throws(() => validate("attribute"), "Throws an error when context not provided");

  Ember.run(function() {

    validate("empty", user).then(() => {
      assert.ok(true, "Empty value passed validation");
    });

    validate("firstName", user).catch((error) => {
      assert.ok(error instanceof Error, "Validator returns instance of the error class");
    });

    validate("firstName", user).catch((error) => {
      assert.equal(error.key, messages.not_number, "The string value is not passed validation");
    });

    validate("age", user).then(() => {
      assert.ok(true, "Number validation passed");
    });

    validate("age", user, { min: 5 }).catch(() => {
      assert.ok(true, "User age less then 5");
    });

  });

});
