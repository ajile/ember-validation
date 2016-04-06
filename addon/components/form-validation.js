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
        this.trigger('passed');
        this.sendAction('action', Ember.K, this.onSubmitFailed.bind(this));
      },
      (error) => {
        this.trigger('failed');
      });

  },

  /**
  * Callback for submit failed
  *
  * @function
  * @returns {undefined}
  */
  onSubmitFailed() {
    this.showAllErrors();
  },

  /**
  * Make all errors visible
  *
  * @function
  * @returns {undefined}
  */
  showAllErrors() {
    this.get('mediators').forEach((mediator) => {
      let attribute = get(mediator, 'attribute');

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
