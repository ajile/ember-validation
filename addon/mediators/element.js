import Ember from 'ember';
import Config from 'ember-validation/configuration';
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
    const attribute = this.get('validate-path');
    Config.LOG_VALIDATION && Logger.log('Validation : <<mediator>> : Element : _validate : %s %O', attribute, this.get('view.element'));
    const promise = tryInvoke(this.get('context'), 'validateByName', [ attribute ]);
    if (promise) {
      const defer = RSVP.defer()
      promise.then(() => { defer.resolve(); }, errors => { defer.reject(errors.shift()); });

      return defer.promise;
    }
    return RSVP.resolve();
  }

});
