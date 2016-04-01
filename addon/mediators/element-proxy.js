import Ember from 'ember';
import BaseMediator from 'ember-validation/core/mediator';

const { RSVP, computed, tryInvoke, Logger } = Ember;

/**
  @class ElementProxyMediator
  @extends BaseMediator
  @public
*/
export default BaseMediator.extend({

  attribute: computed.alias('view.errors-name'),

  /**
    @method _validate
    @protected
    @return Ember.RSVP.Promise
  */
  _validate() {
    Logger.info('Validation : Mediator : ElementProxy : validate : ', this.get('attribute'), this.get('view.element'));
    const promise = tryInvoke(this.get('view'), 'validate');
    return promise || RSVP.resolve();
  }

});
