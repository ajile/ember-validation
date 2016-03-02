import Ember from 'ember';
import ValidatorMediator from 'ember-validation/mediator/validator';

const { get, computed, RSVP } = Ember;

/**
  @class ValidatorMediator
  @module ember-validation/mediator
  @extends ValidatorMediator
  @uses Ember.MutableArray
  @public
*/
export default ValidatorMediator.extend({

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
    @return {Ember.ObjectProxy|Ember.Object}
  */
  getSnapshot() {
    const content = this.get("context")._createSnapshot();
    return Ember.ObjectProxy.create({ content });
  }

});
