import Ember from 'ember';
import BaseMediator from 'ember-validation/core/mediator';
import ElementMediatorMixin from 'ember-validation/mixins/element-mediator';

const { RSVP, computed, tryInvoke, Logger } = Ember;

/**
* @module
* @augments ember-validation/BaseMediator
*/
export default BaseMediator.extend(ElementMediatorMixin, {
  /** @type {String} */
  attribute: computed.or('options.errorsName', 'view.errors-name'),

  init() {
    this._super(...arguments);

    this.get('view')
      .on('passed', this, this._onViewValidationPassed)
      .on('failed', this, this._onViewValidationFailed);
  },

  willDestroy() {
    let view = this.get('view');

    if (view) {
      view
        .off('passed', this, this._onViewValidationPassed)
        .off('failed', this, this._onViewValidationFailed);
    }

    this._super(...arguments);
  },

  _onViewValidationPassed() {
    this.trigger('passed', this);
  },

  _onViewValidationFailed(error) {
    this.trigger('failed', error, this);
  },

  /**
  * Validate
  * @function
  * @override
  * @returns {RSVP.Promise}
  */
  _validate() {
    Logger.info('Validation : Mediator : ElementProxy : validate : ', this.get('attribute'), this.get('view.element'));
    const promise = tryInvoke(this.get('view'), 'validate');

    return promise || RSVP.resolve();
  }

});
