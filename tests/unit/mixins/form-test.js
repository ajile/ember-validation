import Ember from 'ember';
import FormMixin from '../../../mixins/form';
import { module, test } from 'qunit';

module('Unit | Mixin | form');

// Replace this with your real tests.
test('it works', function(assert) {
  var FormObject = Ember.Object.extend(FormMixin);
  var subject = FormObject.create();
  assert.ok(subject);
});
