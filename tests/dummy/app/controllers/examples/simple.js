import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { tryInvoke } from '@ember/utils';

export default Controller.extend({

  user: computed(function() {
    return this.store.createRecord("user");
  }),

  company: computed(function() {
    return this.store.createRecord("company");
  }),

  actions: {

    validate() {
      tryInvoke(this.get("user"), "validate");
    },

    validateCompany() {
      tryInvoke(this.get("company"), "validate");
    },

    validateField(name) {
      this.get("user").validateByName(name);
    },

    check() {
      tryInvoke(this.get("user"), "check");
    },

    setGender(gender) {
      this.set("user.gender", gender);
    }

  }

});
