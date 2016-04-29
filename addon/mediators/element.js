import Ember from 'ember';
import BaseMediator from 'ember-validation/core/mediator';
import ElementMediatorMixin from 'ember-validation/mixins/element-mediator';

const { RSVP, tryInvoke, Logger } = Ember;

/**
* @module
* @augments ember-validation/BaseMediator
*/
export default BaseMediator.extend(ElementMediatorMixin, {

  /**
   * @function
   * @override
   * @returns {RSVP.Promise}
   */
  _validate() {
    let attribute = this.get('attribute');
    Logger.log('Validation : <<mediator>> : Element : _validate : %s %O', attribute, this.get('view.element'));
    const promise = tryInvoke(this.get('context'), 'validate', [attribute]);
    return promise || RSVP.resolve();
  }

});
