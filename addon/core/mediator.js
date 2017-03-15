/* jslint plusplus: true */
import Ember from 'ember';
import ValidatableMixin from 'ember-validation/mixins/validatable';

const { RSVP, observer } = Ember;

/**
 * @module ember-validation/core/mediator
 * @extends Ember.Object
 * @augments Ember.Evented
 * @augments module:ember-validation/mixins/validatable
 */
export default Ember.Object.extend(ValidatableMixin, Ember.Evented, {

  /**
   * An object contains attribute, for which mediator has been created. Wrapped
   * [validatable object]{@link module:ember-validation/mixins/validatable} calling with an
   * attribute name and context. The object gets a value for validation from the context by
   * provided name of attribute.
   * @type {Object}
   */
  context: Ember.Object.create(),

  /**
   * Validation will be executed only if it is `true`. The property sets from the outside, when
   * mediator creates. For example to add a condition from the validation object, you should define
   * it in the [validationScheme]{@link module:addon/mixins/validation~validationScheme} property
   * like that:
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
   * @default true
   */
  condition: null,

  /**
   * An observer for the `condition` property. The property defines in the
   * object's validation scheme.
   * @function
   * @fires module:addon/core/mediator~conditionChanged
   */
  conditionDidChange: observer("condition", function() {
    this.trigger("conditionChanged", this.get("condition"), this.get("context"), this);
  }),

  /**
   * @event
   * @property {boolean} condition - The property's value
   * @property {module:addon/mixins/validatable} context - An object contain the mediator
   * @property {module:addon/core/mediator} mediator - Mediator itself
   */
  conditionChanged: Ember.K,

  /**
   * @event
   * @property {module:addon/core/mediator} mediator - The mediator instance
   */
  passed: Ember.K,

  /**
   * @event
   * @property {Array} errors - The error message list
   * @property {module:addon/core/mediator} mediator - The mediator instance
   */
  failed: Ember.K,

  /**
   * @function
   * @override
   * @returns Ember.RSVP.Promise
   */
  validate() {
    if (!Ember.isNone(this.condition) && !this.get('condition')) {
      this.trigger("passed", this);
      return RSVP.resolve();
    }
    const promise = this._validate(...arguments);
    const onResolve = () => { this.trigger("passed", this); };
    const onReject = errors => { this.trigger("failed", errors, this); };
    promise.then(onResolve, onReject);
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
    var promise = this._check(...arguments);
    promise.then(() => {}, () => {});
    return promise;
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
  _check() {
    return this._validate(...arguments);
  },

  /**
   * Collecting all computed properties that contained in the options into the
   * object.
   * @function
   * @returns Object
   */
  optionsToJSON() {
    const options = this.get("options"),
          keys = Ember.A(options ? Object.keys(options) : []),
          result = {};
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      result[key] = this.get(key);
    }
    return result;
  }

});
