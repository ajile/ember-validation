import Ember from 'ember';

const { computed } = Ember;

/**
  @class Validatable
  @module ember-validation/validation/mediators
  @public
*/
export default Ember.Mixin.create({

  /**
    @property isValidatable
    @type Boolean
    @readOnly
  */
  isValidatable: computed(() => true).readOnly(),

  /**
    @method validate
    @abstract
  */
  validate() {
    Ember.assert("Classes that uses `Validatable` mixin should implement `validate` method");
  }

});
