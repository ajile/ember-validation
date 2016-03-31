import Ember from 'ember';
import BaseMediator from 'ember-validation/core/mediator';

const { RSVP, tryInvoke, Logger } = Ember;

/**
  @module
  @augments module:addon/core/mediator
  @public
*/
export default BaseMediator.extend({

  view : null,

  /**
    @method _validate
    @protected
    @return Ember.RSVP.Promise
  */
  _validate() {
    var attribute = this.get('attribute'),
        promise = tryInvoke(this.get('context'), 'validate', [attribute]);

    Logger.info('Validation : Mediator : Element : validate : ', attribute);

    return promise || RSVP.resolve();
  }

});
