import Ember from 'ember';
import BaseMediator from 'ember-validation/core/mediator';

const { RSVP, computed, tryInvoke, Logger } = Ember;

/**
* @module
* @augments ember-validation/BaseMediator
*/
export default BaseMediator.extend({
  /** @type {Ember.Component} */
  attribute: computed.or('options.errorsName', 'view.errors-name'),

  /**
  * Validate
  * @function
  *@returns {undefined}
  */
  _validate() {
    Logger.info('Validation : Mediator : ElementProxy : validate : ', this.get('attribute'), this.get('view.element'));
    const promise = tryInvoke(this.get('view'), 'validate');

    return promise || RSVP.resolve();
  }

});
