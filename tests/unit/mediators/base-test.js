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
  assert.ok(mediator.hasObserverFor("condition"), "Mediators has observer for condition");
  assert.ok(mediator.options, "Mediators has options");
  assert.ok(mediator.context, "Mediators has context");

});


test('it triggers events', function(assert) {

  expect(2);

  Ember.run(function() {
    var Mediator = BaseMediator.extend();
    var mediator = Mediator.create();
    mediator.on("passed", () => {
      assert.ok(true, "Mediators triggers `passed` event when validation passed");
    });
    mediator.validate();
  });

  Ember.run(function() {
    var Mediator = BaseMediator.extend({
      _validate: () => { return RSVP.reject(); }
    });
    var mediator = Mediator.create();
    mediator.on("failed", () => {
      assert.ok(true, "Mediators triggers `failed` event when validation failed");
    });
    mediator.validate();
  });

});


test('it returns promise', function(assert) {

  assert.ok(BaseMediator.create().validate() instanceof Ember.RSVP.Promise, "Mediators returns a promise");
  assert.ok(BaseMediator.create().validate()._state === 1, "The validate method returns resolved promise as default");
  assert.ok(false, "Promise resolves when mediator passed validation");
  assert.ok(false, "Promise resolves when mediator's condition false");
  assert.ok(false, "Promise rejects with error when mediator failed");

});
