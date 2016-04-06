import Ember from "ember";

export default Ember.Controller.extend({

  isAccordionOpened: false,

  actions : {
    toggleAccordion() {
      this.toggleProperty('isAccordionOpened');
    },

    saveUser() {
      console.log('Submit');
      alert('Saved!');
    }
  }
});
