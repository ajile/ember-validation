import Ember from 'ember';
import FormValidation from "ember-validation/components/form-validation";

export default FormValidation.extend({

  isAccordionOpened: false,

  modelWasSaved: false,



  /**
  * Callback for submit passed
  *
  * @function
  * @returns {undefined}
  */
  onSubmitDone() {
    this.set('modelWasSaved', true);
  },

  didInsertElement() {
    this._super(...arguments);

    this.$().on('focus', 'input', () => { this.set('modelWasSaved', false); })
  },

  _onValidFailed: Ember.on('formValidationFailed', function () {
    if ((this.get('errors.city') || this.get('errors.street') || this.get('errors.house')) && !this.get('isAccordionOpened')) {
      this.toggleProperty('isAccordionOpened');
    }

    Ember.run.scheduleOnce('afterRender', this, () => {
      this.$().find('.has-error:first input').focus();
    });


  }),

  actions: {
    toggleAccordion() {
      this.toggleProperty('isAccordionOpened');
    }
  }
});
