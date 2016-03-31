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
    var promise = tryInvoke(this.get('view'), 'validate');

    Logger.info('Validation : Mediator : ElementProxy : validate : ', this.get('attribute'));

    return promise || RSVP.resolve();
  }

});
