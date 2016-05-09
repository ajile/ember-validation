import Ember from "ember";
import ValidationMixin from "ember-validation/mixins/validation";
import ModelValidatorMediator from 'ember-validation/mediators/model-validator';


/**
  @module
  @augments module:ember/Mixin
  @augments module:addon/mixins/validation
  @public
*/
export default Ember.Mixin.create(ValidationMixin, {

  initErrors() {
    // Do nothing...
  },

  /**
    @method
    @param {Validator} validator
    @param {Object} options
    @param {Object} context
    @private
    @return Ember.Array
  */
  _createValidatorMediator(attribute, validator, options={}, context=this) {
    return ModelValidatorMediator.extend(options).create({ context, attribute, validator, options });
  }

});
