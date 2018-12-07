import EmberObject from '@ember/object';
import ComponentMixin from 'ember-validation/mixins/component';
import { module, test } from 'qunit';

module('Unit | Mixin | component');

// Replace this with your real tests.
test('it works', function(assert) {
  var ComponentObject = EmberObject.extend(ComponentMixin);
  var subject = ComponentObject.create();
  assert.ok(subject);
});
