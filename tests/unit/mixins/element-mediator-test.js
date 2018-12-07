import EmberObject from '@ember/object';
import ElementMediatorMixin from 'ember-validation/mixins/element-mediator';
import { module, test } from 'qunit';

module('Unit | Mixin | element mediator');

// Replace this with your real tests.
test('it works', function(assert) {
  var ElementMediatorObject = EmberObject.extend(ElementMediatorMixin);
  var subject = ElementMediatorObject.create();
  assert.ok(subject);
});
