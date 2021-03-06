import Ember from 'ember';

const { computed } = Ember;

/**
 * @module ember-validation/mixins/validatable
 * @extends Ember.Mixin
 */
export default Ember.Mixin.create({

  /**
    @type Boolean
    @default true
    @readOnly
  */
  isValidatable: computed(() => true).readOnly(),

  /**
    @method
    @abstract
  */
  validate() {
    Ember.assert("Classes that uses `Validatable` mixin should implement `validate` method");
  }

});
