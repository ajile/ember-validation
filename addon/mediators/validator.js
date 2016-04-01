import Ember from 'ember';
import BaseMediator from 'ember-validation/core/mediator';

const { get } = Ember;

/**
  @module
  @augments module:addon/core/mediator
  @public
*/
export default BaseMediator.extend({

  /**
   * This is the validation options that passes into the validator. Options
   * influence to validation behaviour. For example `number` validator mey get
   * following options: `min`, `max`, `float`, `int`, `positive` and so on.
   * @type {Object}
   */
  options: Ember.Object.create(),

  /**
    Returns snapshot of the context object. This method should useful if you'd
    like to use decorators for model or component or...

    Creating snapshot for a model:
    @example
      ...
      return this.get("context")._createSnapshot();
      ...

    Creating snapshot for a component:
    @example
      return Ember.ObjectProxy.create({
        content: this.get("context.model").toJSON();
      });

    @method getSnapshot
    @protected
    @return {Ember.ObjectProxy|Ember.Object}
  */
  getSnapshot() {
    return get(this, "context");
  },

  /**
    @method _validate
    @protected
    @return Ember.RSVP.Promise
  */
  _validate() {
    const attribute = get(this, "attribute"),
          options = get(this, "options"),
          context = this.getSnapshot("context"),
          validator = this.get("validator");
    return validator(attribute, context, options);
  }

});
