import Ember from 'ember';
import ComponentVaidation from 'ember-validation/mixins/component';
import layout from '../templates/components/form-validation';

const { K, RSVP } = Ember;
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
    var validationError;

    event.preventDefault();

    this.beforeValidate()
      .then(() => {
        this.trigger('validationBegin');
        this.validate()
          .then(
            () => {
              this.hideAllErrors();
              this.onValidatePassed();
              this.trigger('formValidationPassed');

              this.sendAction('action', () => {
                  this.onSubmitDone();
                  this.afterSubmit();
                }, () => {
                  this.showAllErrors();
                  this.onSubmitFailed();
                });
            },
            (error) => {
              validationError = error;
              this.showAllErrors();
              this.onValidateFailed(error);
              this.trigger('formValidationFailed', error);
          })
          .finally(() => {
            this.trigger('validationEnd', validationError);
            this.afterValidation(validationError);
          });

      }).finally(() => { this.afterValidation(validationError) });



  },

  beforeValidate: () => RSVP.resolve(),

  onValidatePassed: K,

  onValidateFailed: K,

  afterValidation: K,

  /**
  * Callback for submit passed
  *
  * @function
  * @returns {undefined}
  */
  onSubmitDone: K,

  /**
  * Custom callback for submit failed
  *
  * @function
  * @returns {undefined}
  */
  onSubmitFailed: K,

  afterSubmit: K,

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
    Ember.keys(this.get('visibleErrors')).forEach((attribute) => {
      this.set('visibleErrors.' + attribute, true);
    });
  },

});
