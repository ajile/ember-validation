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
        this.sendAction('action');
      },
      (error) => {
        this.trigger('failed');
      });

  }

});
