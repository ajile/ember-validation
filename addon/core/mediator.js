import Ember from 'ember';
import ValidatableMixin from 'ember-validation/mixins/validatable';

const { RSVP, observer } = Ember;

/**
  @class BaseMediator
  @module ember-validation/core
  @uses ValidatableMixin
  @uses Ember.Evented
  @event passed
  @event failed
  @public
*/
export default Ember.Object.extend(ValidatableMixin, Ember.Evented, {

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
    // this.validate();
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
    const promise = this._validate();
    promise.catch((message) => { this.trigger("failed", message) });
    promise.then(() => { this.trigger("passed") });
    return promise;
  },

  /**
    @method _validate
    @private
    @return Ember.RSVP.Promise
  */
  _validate: () => RSVP.resolve()

});
