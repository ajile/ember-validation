import Ember from 'ember';
import DS from 'ember-data';
import Config from 'ember-validation/configuration';
import ValidatorMediator from 'ember-validation/mediators/validator';

const { get, assert } = Ember;

/**
  @module
  @augments module:addon/mediators/validator
  @uses Ember.MutableArray
  @public
*/
export default ValidatorMediator.extend({

  /**
    Returns snapshot of the context object. This method should useful if you'd
    like to use decorators for model or component or...

    Creating snapshot for a model:
    @example:
        ...
        return this.get("context")._createSnapshot();
        ...


    Creating snapshot for a component:

    @example:
      return Ember.ObjectProxy.create({
        content: this.get("context.model").toJSON();
      });

    @method getSnapshot
    @return {Ember.ObjectProxy|Ember.Object}
  */
  getSnapshot() {
    assert("Context should be instance of the DS.Model class.", get(this, "context") instanceof DS.Model);

    const context = get(this, "context");
    const content = context._createSnapshot();

    content.get = key => key in content._attributes ? content._attributes[key] : Ember.copy(get(context, key), true);

    return Ember.ObjectProxy.create({ content });
  }

});
