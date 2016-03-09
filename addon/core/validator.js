import Ember from 'ember';
import ValidatableMixin from 'ember-validation/mixins/validatable';

const { RSVP, get } = Ember;

export default Ember.Object.extend(Ember.Evented, ValidatableMixin, {

  /**
    Error messages. It should be redefined in child classes.
    @property messages
    @type Object
  */
  messages: {
    default: "VALIDATION_ERROR"
  },

  /**
    The flag means that blank values should be validated as well.
    @property blankValue
    @type Boolean
    @default false
  */
  blankValue: false,

  /**
    @method validate
    @param {String} attributeName  The name of the object attribute that should be validated
    @param {String} context  An object that has attribute with name `attributeName`
    @param {Object} options  Validation additional options
    @abstract
    @return {Ember.RSVP.Promise}
  */
  validate(attributeName, context) {
    Ember.assert("You should provide an attribute name", attributeName);
    Ember.assert("You should provide a context", context);
    const value = get(context, attributeName);
    if (Ember.isBlank(value) && !this.get("blankValue")) {
      this.trigger("passed");
      return RSVP.resolve();
    }
    const promise = this._validate(...arguments);
    promise.then(() => { this.trigger("passed"); });
    promise.catch(() => { this.trigger("failed"); });
    return promise;
  },

  /**
    @method _validate
    @param {String} attributeName
    @param {Ember.Object} context
    @param {Ember.Object} context
    @protected
    @abstract
    @return {Ember.RSVP.Promise}
  */
  _validate() {
    Ember.assert("Validators should implement `_validate` method");
  }

});
