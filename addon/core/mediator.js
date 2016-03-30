import Ember from 'ember';
import ValidatableMixin from 'ember-validation/mixins/validatable';

const { RSVP, observer } = Ember;

/**
  @module
  @augments module:ember/Object
  @augments module:ember/Evented
  @augments module:addon/mediators/validator
  @public
*/
export default Ember.Object.extend(ValidatableMixin, Ember.Evented, {

  /**
   * An object contains attribute, for which mediator has been created. Wrapped validatable object
   * calling with an attribute name and context. The object gets a value for validation from the
   * context by provided name of attribute.
   * @type {Object}
   */
  context: Ember.Object.create(),

  /**
   * Validation will be executed only if it is `true`. The property sets from the outside, when
   * mediator creates. For example to add a condition from the validation object, you should define
   * it in the `validationScheme` property like that:
   *
   * @example
   *   validationScheme: {
   *     username: {
   *       options: {
   *         condition: Ember.computed.bool("isSomething")
   *       }
   *       validators: [ {name: "required"} ]
   *     }
   *   },
   *   isSomething: false,
   *   username: ""
   *
   * @type {Boolean|ember/Computed}
   * @default null
   */
  condition: null,

  /**
   * An observer for the `condition` property. The property defines in the
   * object's validation scheme.
   * @function
   * @fires module:addon/core/mediator#conditionChanged
   */
  conditionDidChange: observer("condition", function() {
    this.trigger("conditionChanged");
  }),

  /**
   * @function
   * @override
   * @returns Ember.RSVP.Promise
   */
  validate() {
    if (!Ember.isNone(this.condition) && !this.get('condition')) {
      this.trigger("passed");
      return RSVP.resolve();
    }
    const promise = this._validate(...arguments);
    promise.catch((message) => { this.trigger("failed", message); });
    promise.then(() => { this.trigger("passed"); });
    return promise;
  },

  /**
   * @function
   * @returns Ember.RSVP.Promise
   */
  check() {
    if (!Ember.isNone(this.condition) && !this.get('condition')) {
      return RSVP.resolve();
    }
    return this._check(...arguments);
  },

  /**
   * @function
   * @abstract
   * @fires module:addon/core/mediator#failed
   * @fires module:addon/core/mediator#passed
   * @returns Ember.RSVP.Promise
   */
  _validate: () => RSVP.resolve(),

  /**
   * @function
   * @abstract
   * @returns Ember.RSVP.Promise
   */
  _check: () => RSVP.resolve()

});
