import Ember from 'ember';
import ValidatableMixin from 'ember-validation/mixins/validatable';

const { RSVP, get } = Ember;

export default Ember.Object.extend(ValidatableMixin, {

  /**
    Default error message. It should be redefined in child classes.
    @property message
    @type String
  */
  message: "VALIDATION_ERROR",

  /**
    The flag means that blank values should be validated as well.
    @property blankValue
    @type Boolean
    @default false
  */
  blankValue: false,

  /**
    @method validate
    @abstract
  */
  validate(attributeName, context) {
    const value = get(context, attributeName);
    if (Ember.isBlank(value) && !this.get("blankValue")) {
      return RSVP.resolve();
    }
    return this._validate(...arguments);
  },

  /**
    @method _validate
    @param {String} attributeName
    @param {Ember.Object} context
    @param {Ember.Object} context
    @protected
    @abstract
    @return Ember.RSVP.Promise
  */
  _validate() {
    Ember.assert("Validators should implement `_validate` method");
  }

});
