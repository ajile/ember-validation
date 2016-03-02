import Ember from 'ember';
import Validator from '../../../validators/<%= dasherizedModuleName %>';
import { module, test } from 'qunit';

const { run } = Ember;

module('Unit | Validator | <%= classifiedModuleName %>');

// Replace this with your real tests.
test('it works', function(assert) {

  expect(1);

  const validator = Validator.create();

  run(function() {
    let promise = validator.validate("test", Ember.Object.create());
    promise.then(() => assert.ok(true));
  });

});
