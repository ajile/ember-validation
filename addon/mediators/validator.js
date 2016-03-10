import Ember from 'ember';
import BaseMediator from 'ember-validation/core/mediator';

const { get } = Ember;

/**
  @class ValidatorMediator
  @module ember-validation/mediators
  @extends BaseMediator
  @public
*/
export default BaseMediator.extend({

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
          context = this.getSnapshot("context");

    console.log("Validator mediator calls validate on validator %o (for %s)", this.get("validator"), attribute);

    return this.get("validator").validate(attribute, context, options);
  }

});
