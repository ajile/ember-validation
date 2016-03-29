import Ember from 'ember';
import ValidatableMixin from 'ember-validation/mixins/validatable';

const { RSVP, observer } = Ember;

/**
  @module
  @augments module:ember/Object
  @augments module:ember/Evented
  @augments module:addon/mediators/validator
  @fires addon/mixins/validatable#passed
  @fires addon/mixins/validatable#failed
  @public
*/
export default Ember.Object.extend(ValidatableMixin, Ember.Evented, {

  /**
    An object contains attribute that should be validated. Validators should
    get an attribute name and context where this attribute can be found by name,
    to validate its value.
    @property context
    @type Object
  */
  context: Ember.Object.create(),

  /**
    This is the validation options that passes into the validator. Options
    influence to validation behaviour. For example `number` validator mey get
    following options: `min`, `max`, `float`, `int`, `positive` and so on.
    @property options
    @type Object
  */
  options: Ember.Object.create(),

  /**
    Validation will be executed only if it's `true`. The property sets by
    outside when mediator creates.
    @property condition
    @type Boolean|Ember.Computed
    @default null
  */
  condition: null,

  /**
    An observer for the `condition` property. The property defines in the
    object's validation scheme.
    @method conditionDidChange
  */
  conditionDidChange: observer("condition", function() {
    this.trigger("conditionChanged");
  }),

  /**
    @method validate
    @return Ember.RSVP.Promise
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
    @method check
    @return Ember.RSVP.Promise
  */
  check() {
    if (!Ember.isNone(this.condition) && !this.get('condition')) {
      return RSVP.resolve();
    }
    return this._check(...arguments);
  },

  /**
    @method _validate
    @protected
    @return Ember.RSVP.Promise
  */
  _validate: () => RSVP.resolve(),

  /**
    @method _check
    @protected
    @return Ember.RSVP.Promise
  */
  _check: () => RSVP.resolve()

});
