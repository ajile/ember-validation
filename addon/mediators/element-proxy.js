import Ember from 'ember';
import Config from 'ember-validation/configuration';
import BaseMediator from 'ember-validation/core/mediator';
import ElementMediatorMixin from 'ember-validation/mixins/element-mediator';

const { RSVP, computed, tryInvoke, Logger } = Ember;

/**
 * @module ember-validation/mediators/element-proxy
 * @extends module:ember-validation/core/mediator
 * @augmented module:ember-validation/mixins/element-mediator
 */
export default BaseMediator.extend(ElementMediatorMixin, {

  /** @type {String} */
  attribute: computed.or('options.errorsName', 'view.errors-name'),

  init() {
    this._super(...arguments);

    this.get('view')
      .on('passed', this, this._onViewValidationPassed)
      .on('failed', this, this._onViewValidationFailed)
      .$().attr('tabindex', -1).addClass('no-focus'); // make element focusable
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

  _onFocusOut() {
    // validate only when whole element lost focus
    Ember.run.sync();
    Ember.run.next(this, () => {
      Ember.run.scheduleOnce('afterRender', this, () => {
        const view = this.get('view');

        if (!(view.$().is(':focus') || view.$(':focus').length)) {
          this.validate();
        }
      });
    });
  },

  /**
   * @function
   * @override
   * @returns {RSVP.Promise}
   */
  _validate() {
    Config.LOG_VALIDATION && console.log('Validation : <<mediator>> : ElementProxy : _validate : %s %O', this.get('attribute'), this.get('view.element'));

    const promise = tryInvoke(this.get('view'), 'validate');

    return promise || RSVP.resolve();
  }

});
