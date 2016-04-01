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
    let attribute = this.get('attribute');
    Logger.info('Validation : Mediator : Element : validate : ', attribute, this.get('view.element'));
    const promise = tryInvoke(this.get('context'), 'validate', [attribute]);
    return promise || RSVP.resolve();
  }

});
