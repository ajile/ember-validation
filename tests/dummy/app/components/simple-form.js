import Ember from 'ember';
import FormValidation from "ember-validation/components/form-validation";

const { RSVP } = Ember;

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

  beforeValidation() {
    const deferred = RSVP.defer();

    if (!this.get('isAccordionOpened')) {

      this.toggleProperty('isAccordionOpened');
      Ember.run.scheduleOnce('afterRender', this, () => { deferred.resolve(); })
      this.one('validationEnd', (error) => {
        if (!(this.get('errors.city') || this.get('errors.street') || this.get('errors.house'))) {
          this.toggleProperty('isAccordionOpened');
        }
      });
    } else {
      deferred.resolve();
    }
    return deferred.promise;
  },

  _onValidFailed: Ember.on('formValidationFailed', function () {

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
