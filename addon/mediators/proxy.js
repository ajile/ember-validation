import Ember from 'ember';
import Config from 'ember-validation/configuration';
import BaseMediator from 'ember-validation/core/mediator';
import { lookupValidator } from 'ember-validation/utils/lookup';
import { createError } from 'ember-validation/utils/error';

const { get, RSVP } = Ember;

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
          options = this.optionsToJSON(),
          context = this.getSnapshot("context"),
          validator = this.get("validator");

    const attributeValue = context.get(attribute);
    if (Ember.isNone(attributeValue)) {
      return Ember.RSVP.resolve();
    }

    const isValidatable = attributeValue.get("isValidatable");

    if (options.required) {
      if (!attributeValue.get("content")) {
        let error = createError("required", attributeValue, "required");
        return RSVP.reject(error.set("options", options));
      }
      return RSVP.resolve();
    }

    Ember.assert("The proxy mediator working with validatable objects only", isValidatable);

    Config.LOG_VALIDATION && Ember.Logger.log("Validation : <<mediator>> : Validate : _validate '%s'", this.get('attribute'));

    const promise = attributeValue.validate();
    return promise.catch(errors => {

      errors.forEach(errors => {
        errors.forEach(error => {
          error.set("options", options);
        });
      });
      return RSVP.reject(errors);
    });
  }

});
