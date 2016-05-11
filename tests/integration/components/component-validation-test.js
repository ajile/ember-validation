import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('component-validation', 'Integration | Component | component validation', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{component-validation}}`);

  assert.equal(this.$().text().trim(), 'No Block Specified', 'no block');

  // Template block usage:
  this.render(hbs`
    {{#component-validation}}
      template block text
    {{/component-validation}}
  `);

  assert.equal(this.$().text().trim(), 'template block text', 'block');
});
