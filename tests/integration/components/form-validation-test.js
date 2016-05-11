import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('form-validation', 'Integration | Component | form validation', {
  integration: true
});

test('it renders', function(assert) {
  this.on('myAction', function() { });

  this.render(hbs`{{form-validation action=(action "myAction")}}`);

  assert.equal(this.$().text().trim(), 'No Block Specified');

  this.render(hbs`
    {{#form-validation action=(action "myAction")}}
      template block text
    {{/form-validation}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
