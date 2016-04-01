import Ember from 'ember';
import { module, test } from 'qunit';
import BaseValidator from 'ember-validation/core/validator';

const { RSVP } = Ember;

const ResolvesValidator = BaseValidator.extend({ _validate: () => RSVP.resolve() });
const RejectsValidator = BaseValidator.extend({ _validate: () => RSVP.reject("ERROR") });

let resolvesValidator;
let rejectsValidator;

module('Unit | Validator | Base');

test('it has interface', function(assert) {

  expect(6);

  resolvesValidator = ResolvesValidator.create();
  rejectsValidator = RejectsValidator.create();

  assert.throws(() => BaseValidator.create().validate("attribute"), "Throws an error when _validate method is not defined");

  assert.throws(() => resolvesValidator.validate(), "Throws an error when attributeName is not provided");
  assert.throws(() => resolvesValidator.validate("a"), "Throws an error when context is not provided");

  assert.ok(resolvesValidator.get("isValidatable"), "Validators are validatable");
  assert.ok(Ember.typeOf(resolvesValidator.trigger) === "function", "Validators are evented");

  assert.ok(resolvesValidator.validate("a", {a: 1}) instanceof Ember.RSVP.Promise, "Validators returns a promise object");

});

test('it fires events', function(assert) {

  expect(2);

  resolvesValidator = ResolvesValidator.create();
  Ember.run(function() {
    resolvesValidator.on("passed", () => {
      assert.ok(true, "Validators sends passed events when they're valid");
    });
    resolvesValidator.validate("a", {a: 1});
  });

  rejectsValidator = RejectsValidator.create();
  Ember.run(function() {
    rejectsValidator.on("failed", () => {
      assert.ok(true, "Validators sends failed events when they're failed");
    });
    rejectsValidator.validate("a", {a: 1});
  });

});

test('it returns a promise', function(assert) {

  expect(2);

  resolvesValidator = ResolvesValidator.create();
  Ember.run(function() {
    resolvesValidator.validate("a", {a: 1}).then(() => {
      assert.ok(true, "A promise reolved when the validator succeed");
    });
  });


  rejectsValidator = RejectsValidator.create();
  Ember.run(function() {
    rejectsValidator.validate("a", {a: 1}).catch(() => {
      assert.ok(true, "A promise rejected when the validator failed");
    });
  });

});

