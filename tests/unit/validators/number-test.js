import Ember from 'ember';
import { module, test } from 'qunit';
import NumberValidator from 'ember-validation/validators/number';

module('Unit | Validator | number');

test('it works', function(assert) {

  var user = Ember.Object.create({
    empty: "",
    firstName: "Vladimir",
    lastName: "Milkov",
    age: 0
  });

  var messages = {
    "not_number": "not_number"
  };

  var validator = NumberValidator.create({ messages });

  assert.throws(() => validator.validate(), "Throws an error when attribute name not provided");
  assert.throws(() => validator.validate("attribute"), "Throws an error when context not provided");

  validator.validate("empty", user).then(() => {
    assert.ok(true, "Empty value passed validation");
  });

  validator.validate("firstName", user).catch((message) => {
    assert.equal(message, messages.not_number, "The string value is not passed validation");
  });

  validator.validate("age", user).then(() => {
    assert.ok(true, "Number validation passed");
  });

  validator.validate("age", user, { min: 5 }).then(() => {
    assert.ok(true, "Number validation passed");
  });

});
