import Ember from 'ember';
import ComponentVaidation from 'ember-validation/mixins/component';
import layout from '../templates/components/form-validation';

/**
 * @module
 * @augments ember/Component
 * @augments ember-validation/mixins/component
 */
export default Ember.Component.extend(ComponentVaidation, {
  layout: layout,

  /** @type {String} */
  tagName: 'form',

  /**
   * Validate all form on submit
   *
   * @function
   * @param {jQuery.Event} event
   * @returns {undefined}
   */
  submit(event) {
    event.preventDefault();

    this.validate().then(
      () => {
        this.trigger('formValidationPassed');
        this.sendAction('action', this.onSubmitDone.bind(this), this.onSubmitFailed.bind(this));
      },
      (error) => {
        this.trigger('formValidationFailed', error);
        this.showAllErrors();
      });

  },

  /**
  * Callback for submit passed
  *
  * @function
  * @returns {undefined}
  */
  onSubmitDone: Ember.K,

  /**
  * Custom callback for submit failed
  *
  * @function
  * @returns {undefined}
  */
  onSubmitFailed: Ember.K,

  /**
  * Callback for submit failed
  *
  * @function
  * @returns {undefined}
  */
  _onSubmitFailed() {
    this.showAllErrors();
    this.onSubmitFailed();
  },

  /**
  * Make all errors visible
  *
  * @function
  * @returns {undefined}
  */
  showAllErrors() {
    this.get('mediators').forEach((mediator) => {
      let attribute = Ember.get(mediator, 'attribute');

      attribute && this.set('visibleErrors.' + attribute, true);
    });
  },

  /**
  * Make all errors hidden
  *
  * @function
  * @returns {undefined}
  */
  hideAllErrors() {
    this.get(Ember.keys(this.get('visibleErrors'))).forEach((attribute) => {
      this.set('visibleErrors.' + attribute, true);
    });
  },

});
