import RSVP from 'rsvp';
import { scheduleOnce } from '@ember/runloop';
import FormValidation from "ember-validation/components/form-validation";

export default FormValidation.extend({

  isAccordionOpened: false,

  validationStart() {
    const deferred = RSVP.defer();

    if (!this.get('isAccordionOpened')) {
      this.toggleProperty('isAccordionOpened');
      scheduleOnce('afterRender', this, () => { deferred.resolve(); });
      this.one('validationEnd', () => {
        if (!(this.get('errors.city') || this.get('errors.street') || this.get('errors.house'))) {
          this.toggleProperty('isAccordionOpened');
        }
      });
    } else {
      deferred.resolve();
    }
    return deferred.promise;
  },


  actions: {
    toggleAccordion() {
      this.toggleProperty('isAccordionOpened');
    }
  }
});
