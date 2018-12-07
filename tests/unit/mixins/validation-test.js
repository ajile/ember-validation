import { computed } from '@ember/object';
import RSVP from 'rsvp';
import { run } from '@ember/runloop';
import EmberObject from '@ember/object';
import { typeOf } from '@ember/utils';
import { get } from '@ember/object';
import ValidationMixin from 'ember-validation/mixins/validation';
import AttributeMediator from 'ember-validation/mediators/attribute';
import ValidatorMediator from 'ember-validation/mediators/validator';
import Errors from 'ember-validation/core/errors';
import startApp from '../../helpers/start-app';
import { failValidator } from '../../helpers/validators';
import { createError } from 'ember-validation/utils/error';
import { module, test } from 'qunit';

module('Unit | Mixin | validation', {
  integration: true,
  beforeEach: function () {
    this.app = startApp();
    this.app.register("validator:fail", failValidator);
  },
  afterEach: function () {
    run(this.app, 'destroy');
  }
});

test('it works', function(assert) {
  var ValidationObject = EmberObject.extend(ValidationMixin);
  var subject = ValidationObject.create();
  assert.ok(subject);
});

test('it has interface', function(assert) {
  var ValidationObject = EmberObject.extend(ValidationMixin);
  var subject = ValidationObject.create();

  assert.ok(subject.get("isValidatable"), "It's validatable");
  assert.ok(typeOf(subject.validateByName) === "function", "It can run validation on attribute");
  assert.ok(typeOf(subject.check) === "function", "It can run check on object");
  assert.ok(typeOf(subject.checkByName) === "function", "It can run check on attribute");
});

test('is can run validation on attribute', function(assert) {
  var ValidationObject = EmberObject.extend(ValidationMixin);
  var subject = ValidationObject.create();

  assert.throws(() => subject.validateByName(), "Throws an error when attribute name is not provided");
  assert.throws(() => subject.validateByName("attrName"), "Throws an error when mediator not found");
});

test('is creates mediators', function(assert) {
  const app = this.app;
  const container = app.__container__;
  const ValidationObject = EmberObject.extend(ValidationMixin, {
    "container": container,
    "validationScheme": computed(() => ({
      number: {
        options: {
          testOption: true
        },
        validators: [
          { "name": "required", options: { testOption: true } },
          { "name": "number", options: { testOption: true } }
        ]
      }
    }))
  });
  const subject = ValidationObject.create();
  const mediators = subject.get("mediators");

  assert.equal(mediators.length, 1, "Should be exactly 1 attribute mediator");

  const attributeMediator = mediators.get("firstObject");
  assert.ok(attributeMediator instanceof AttributeMediator, "Object contains in validation object's mediator collection is a AttributeMediator");
  assert.ok(attributeMediator.get("context"), "Attribute mediator should have context");
  assert.equal(attributeMediator.get("context"), subject, "Attribute mediator's context should be object self");
  assert.ok(attributeMediator.get("attribute"), "Attribute mediator should have attribute name");

  assert.ok(attributeMediator.get("testOption"), "The object declared in the attr `options` of the validationScheme should be mixed into the attribute mediator");
  assert.equal(typeOf(attributeMediator.pushObject), "function", "Attribute mediator should be enum object");
  assert.ok(attributeMediator.get("content"), "Attribute mediator should have content");
  assert.equal(attributeMediator.get("length"), 2, "Attribute mediator should contain exactly 2 validators");

  const validatorMediator = attributeMediator.get("firstObject");
  assert.ok(validatorMediator instanceof ValidatorMediator, "Object contains in validation object's mediator collection is a AttributeMediator");
  assert.ok(validatorMediator.get("options"), "Validator mediator should have options the same as they were declared");
  assert.ok(validatorMediator.get("context"), "Validator mediator should have context");
  assert.equal(validatorMediator.get("context"), subject, "Validator mediator's context should be object self");
  assert.ok(validatorMediator.get("attribute"), "Validator mediator should have attribute name");

  assert.ok(validatorMediator.get("testOption"), "The object declared in the validator `options` of the validationScheme should be mixed into the validator mediator");


  const ValidationObject_1 = EmberObject.extend(ValidationMixin, {
    container: container
  });

  const subject_1 = ValidationObject_1.create();
  const mediators_1 = subject_1.get("mediators");

  assert.equal(mediators_1.length, 0, "Object without validationScheme doesn't have mediators");

});

test('it works with object\'s errors', function(assert) {

  assert.expect(7);

  const app = this.app;
  const container = app.__container__;

  var ValidationObject = EmberObject.extend(ValidationMixin, {
    container: container,
    validationScheme: computed(() => ({
      someAttributeName: {
        validators: [
          { "name": "required" },
          { "name": "fail" }
        ]
      }
    })),
    attribute: ""
  });

  var subject = ValidationObject.create();

  assert.ok(subject.get("errors") instanceof Errors, "Error collection should be added if object doesn't have its own");

  assert.equal(subject.get("errors").get("length"), 0, "Subject doesn't have errors before validation");

  subject.validate().catch(() => {
    assert.equal(subject.get("errors.length"), 2, "If validation failed object should get errors from every failed validator");
    subject.clearErrors();
    assert.equal(subject.get("errors.length"), 0, "Errors length equal 0 after clearErrors");
    assert.ok(subject.get("isValid"), "Object become valid after clearErrors");

    subject.validate().catch(() => {
      assert.equal(subject.get("errors.someAttributeName.length"), 2, "Attribute someAttributeName has errors");
      subject.clearErrorsByName("someAttributeName");
      assert.ok(!subject.get("errors.someAttributeName.length"), "Errors length of someAttributeName attr equal 0 after clearErrorsByName");
    });
  });

});

test('it validates', function(assert) {
  assert.expect(3);
  const app = this.app;
  const container = app.__container__;
  // let validationCounter = 0;
  // const ValidationObjectFails = EmberObject.extend(ValidationMixin, {
  //   container: container,
  //   validationScheme: computed(() => ({
  //     name: {
  //       validators: [
  //         { "name": "required" },
  //       ]
  //     },
  //     number: {
  //       validators: [
  //         { "name": "required" },
  //         { "name": "number" }
  //       ]
  //     }
  //   })),
  //   _createAttributeMediator() {
  //     const mediator = this._super(...arguments);
  //     mediator.reopen({
  //       _validate() {
  //         validationCounter++;
  //         return this._super(...arguments);
  //       }
  //     });
  //     return mediator;
  //   },
  // });

  // const subjectFails = ValidationObjectFails.create();
  // var resultFailed = subjectFails.validate();

  // resultFailed.catch(() => {
  //   assert.ok(true, "Validating promise rejects if some validators failed");
  //   assert.ok(subjectFails.get("isInvalid"), "Object become invalid if validation failed");
  // });

  // resultFailed.finally(() => {
  //   assert.equal(validationCounter, 2, "Validate on object calls validate on every attribute mediator");
  // });


  const ValidationObjectPasses = EmberObject.extend(ValidationMixin, {
    container: container,
    validationScheme: computed(() => ({
      name: {
        validators: [
          { "name": "required" },
        ]
      },
      number: {
        validators: [
          { "name": "required" },
        ]
      }
    })),
    name: "Has value",
    number: "Has value"
  });

  const subjectPasses = ValidationObjectPasses.create();
  const resultPassed = subjectPasses.validate();

  assert.ok(resultPassed instanceof RSVP.Promise, "Validate method returns promise");

  resultPassed.then(() => {
    assert.ok(true, "Validating promise resolves if all validators passes");
    assert.ok(subjectPasses.get("isValid"), "Object become valid if validation passed");
  });
});


// test('it checks', function(assert) {
//   assert.ok(false, "Check on object calls validate on every mediator");
//   assert.ok(false, "Check doesn't occures an error on a field");
//   assert.ok(false, "Check method returns promise");
//   assert.ok(false, "Check promise resolves if all validators passes");
//   assert.ok(false, "Check promise rejects if some validators failed");
//   assert.ok(false, "Object do not become invalid if checking failed");
//   assert.ok(false, "Object do not become valid if checking passed");
// });

test('it\'s inheritable', function(assert) {
  const app = this.app;
  const container = app.__container__;
  const User = EmberObject.extend(ValidationMixin, {
    container: container,
    validationScheme: computed(() => ({
      name: {
        validators: [
          { "name": "required" }
        ]
      },
      age: {
        validators: [
          { "name": "required" }
        ]
      }
    })),
    name: ""
  });

  const Driver = User.extend(ValidationMixin, {
    container: container,
    validationScheme: computed(() => ({
      phone: {
        validators: [
          { "name": "required" }
        ]
      }
    })),
    phone: ""
  });


  const Kid = User.extend(ValidationMixin, {
    container: container,
    validationScheme: computed(() => ({
      age: {
        validators: [
          { "name": "number", "options": { max: 18 } }
        ]
      }
    })),
  });


  const Employee = User.extend(ValidationMixin, {
    container: container,
    validationScheme: computed(() => ({
      age: {
        validators: [
          { "name": "number", "options": { min: 18 } }
        ]
      }
    })),
  });


  const user = User.create();
  const driver = Driver.create();
  const employee = Employee.create();
  const kid = Kid.create();

  const userMediators = user.get("mediators");
  const driverMediators = driver.get("mediators");
  const employeeMediators = employee.get("mediators");
  const kidMediators = kid.get("mediators");

  assert.equal(userMediators.get("length"), 2, "The user has 2 mediators");
  assert.equal(driverMediators.get("length"), 3, "The driver has 2 mediators from user and 1 its own, in total 3");
  assert.equal(employeeMediators.get("length"), 2, "The employee has 2 mediators");
  assert.equal(kidMediators.get("length"), 2, "The kid has 2 mediators");
});


test('it accept schema with validation function in it', function(assert) {

  assert.expect(4);

  const app = this.app;
  const container = app.__container__;

  var ValidationObject = EmberObject.extend(ValidationMixin, {
    container: container,
    validationScheme: computed(() => ({
      someAttributeName: {
        validators: [
          { "name": "required" },
          {
            "validate": function() {
              return RSVP.reject(createError("error-code", "value", "validator-name"));
            }
          }
        ]
      }
    })),
    someAttributeName: ""
  });

  var subject = ValidationObject.create();

  assert.equal(subject.get("errors").get("length"), 0, "Subject doesn't have errors before validation");

  subject.validate().catch(() => {
    const errors = subject.get("errors");
    assert.equal(get(errors, "length"), 2, "Subject has 2 errors");
    assert.ok(errors.findBy("message.key", "error-code"), "Subject's errors contain error from validate function");
    assert.notOk(errors.findBy("message.key", "foo"), "Subject's errors don't contain nonexistent error");
  });

});
