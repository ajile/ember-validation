import Ember from 'ember';
import validator from '../../../validators/<%= dasherizedModuleName %>';
import { module, test } from 'qunit';

const { run } = Ember;

module('Unit | Validator | <%= classifiedModuleName %>');

// Replace this with your real tests.
test('it works', function(assert) {

  assert.expect(1);

  run(function() {
    let promise = validator("test", Ember.Object.create());
    promise.then(() => assert.ok(true));
  });

});
