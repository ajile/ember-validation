import Ember from 'ember';
import ValidationMixin from 'ember-validation/mixins/validation';
import startApp from '../../helpers/start-app';
import { module, test } from 'qunit';

module('Unit | Mixin | validation', {
  integration: true,
  setup: function () {
    this.app = startApp();
  },
  teardown: function () {
    Ember.run(this.app, 'destroy');
  }
});

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

test('is creates mediators', function(assert) {
  const app = this.app;
  const container = app.__container__;

  var ValidationObject = Ember.Object.extend(ValidationMixin, {
    container: container,
    validationScheme: {
      number: {
        validators: [
          { "name": "number" }
        ]
      }
    }
  });

  var subject = ValidationObject.create();
  var mediators = subject.get("mediators");

  assert.equal(mediators.length, 1, "Should be exactly 1 attribute mediator");

  const attributeMediator = mediators.get("firstObject");

  assert.ok(attributeMediator.get("options"), "Attribute mediator should have options the same as they were declared");
  assert.ok(false, "Attribute mediator should have context the same as they were declared");
  assert.ok(false, "Attribute mediator should have attribute name");

});
