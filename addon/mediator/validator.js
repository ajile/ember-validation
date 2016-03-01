import BaseMediator from 'ember-validation/core/mediator';

const { RSVP } = Ember;

/**
  @class ValidatorMediator
  @module ember-validation/mediator
  @extends BaseMediator
  @public
*/
export default BaseMediator.extend({

  /**
    @method _validate
    @private
    @return Ember.RSVP.Promise
  */
  _validate() {
    const { attribute, context } = this.getProperties("attribute", "context");
    return this.get("validator").validate(attribute, context);
  }

});
