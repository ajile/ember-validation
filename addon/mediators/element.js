import Ember from 'ember';
import BaseMediator from 'ember-validation/core/mediator';

const { RSVP, tryInvoke, Logger } = Ember;

/**
* @module
* @augments ember-validation/BaseMediator
*/
export default BaseMediator.extend({

  /** @type {Ember/Component} */
  view : null,

  /**
   * Validate
   *
   * @function {RSVP.Promise}
   * @returns {undefined}
   */
  _validate() {
    let attribute = this.get('attribute');
    Logger.info('Validation : Mediator : Element : validate : ', attribute, this.get('view.element'));
    const promise = tryInvoke(this.get('context'), 'validate', [attribute]);
    return promise || RSVP.resolve();
  }

});
