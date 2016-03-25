import Ember from "ember";

export default Ember.Controller.extend({

  emailAndPhoneOpened: false,

  actions : {
    toggleEmailAndPhone() {
      this.toggleProperty('emailAndPhoneOpened');
    }
  }
});
