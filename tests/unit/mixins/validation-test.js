import Ember from 'ember';
import ValidationMixin from 'ember-validation/mixins/validation';
import { module, test } from 'qunit';

module('Unit | Mixin | validation');

// Replace this with your real tests.
test('it works', function(assert) {
  var ValidationObject = Ember.Object.extend(ValidationMixin);
  var subject = ValidationObject.create();
  assert.ok(subject);
});

test('it has interface', function(assert) {
  var ValidationObject = Ember.Object.extend(ValidationMixin);
  var subject = ValidationObject.create();

  assert.ok(subject.get("isValidatable"), "It's validatable");
  assert.ok(Ember.typeOf(subject.validateByName) === "function", "It can run validation on attribute");
});

test('is can run validation on attribute', function(assert) {
  var ValidationObject = Ember.Object.extend(ValidationMixin);
  var subject = ValidationObject.create();

  assert.throws(() => subject.validateByName(), "Throws an error when attribute name is not provided");
  assert.throws(() => subject.validateByName("attrName"), "Throws an error when mediator not found");
});
