import Ember from 'ember';
import ElementMediatorMixin from 'ember-validation/mixins/element-mediator';
import { module, test } from 'qunit';

module('Unit | Mixin | element mediator');

// Replace this with your real tests.
test('it works', function(assert) {
  var ElementMediatorObject = Ember.Object.extend(ElementMediatorMixin);
  var subject = ElementMediatorObject.create();
  assert.ok(subject);
});
