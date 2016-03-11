import Ember from 'ember';
import { module, test } from 'qunit';
import BaseMediator from 'ember-validation/core/mediator';

const { RSVP } = Ember;

module('Unit | Mediators | Base', {
  setup() {
  }
});

test('it has interface', function(assert) {

  var Mediator = BaseMediator.extend();
  var mediator = Mediator.create();

  assert.ok(mediator.get("isValidatable"), "Mediators are validatable");
  assert.ok(Ember.typeOf(mediator.trigger) === "function", "Mediators are evented");
  assert.ok(Ember.typeOf(mediator.check) === "function", "Mediators has check method");
  assert.ok(mediator.hasObserverFor("condition"), "Mediators has observer for condition");
  assert.ok(mediator.options, "Mediators has options");
  assert.ok(mediator.context, "Mediators has context");

});


test('it fires events', function(assert) {

  expect(3);

  Ember.run(function() {
    var Mediator = BaseMediator.extend();
    var mediator = Mediator.create();
    mediator.on("passed", () => {
      assert.ok(true, "Mediators triggers `passed` event when validation passed");
    });
    mediator.validate();
  });

  Ember.run(function() {
    var Mediator = BaseMediator.extend({ _validate: () => RSVP.reject() });
    var mediator = Mediator.create();
    mediator.on("failed", () => {
      assert.ok(true, "Mediators triggers `failed` event when validation failed");
    });
    mediator.validate();
  });

  Ember.run(function() {
    var Mediator = BaseMediator.extend();
    var mediator = Mediator.create();
    mediator.on("conditionChanged", () => {
      assert.ok(true, "Mediators triggers `conditionChanged` event when condition changed");
    });
    mediator.set("condition", true);
  });

});


test('it returns promise', function(assert) {

  expect(5);

  assert.ok(BaseMediator.create().validate() instanceof Ember.RSVP.Promise, "Mediators returns a promise");
  assert.ok(BaseMediator.create().validate()._state === 1, "The validate method returns resolved promise as default");

  Ember.run(function() {
    var Mediator = BaseMediator.extend({ _validate: () => { return RSVP.resolve(); } });
    var mediator = Mediator.create();
    mediator.validate().then(() => {
      assert.ok(true, "Promise resolves when mediator passed validation");
    });
  });

  Ember.run(function() {
    var Mediator = BaseMediator.extend({ condition: false, _validate: () => { return RSVP.reject(); } });
    var mediator = Mediator.create();
    mediator.validate().then(() => {
      assert.ok(true, "Promise resolves when mediator's condition false");
    });
  });

  Ember.run(function() {
    var Mediator = BaseMediator.extend({ _validate: () => { return RSVP.reject(); } });
    var mediator = Mediator.create();
    mediator.validate().catch(() => {
      assert.ok(true, "Promise rejects with error when mediator failed");
    });
  });

});

