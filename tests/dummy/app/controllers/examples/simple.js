import Ember from "ember";

export default Ember.Controller.extend({

  validationResult: "Unknown",

  user: Ember.computed(function() {
    return this.store.createRecord("user");
  }),

  actions: {

    validate() {
      const promise = Ember.tryInvoke(this.get("user"), "validate");
      promise.then(
        () => { this.set("validationResult", "Model is validated - it's valid"); },
        () => { this.set("validationResult", "Model is validated - it's invalid"); }
      );
    },

    validateField(name) {
      this.get("user").validateByName(name);
    },

    check() {
      const promise = Ember.tryInvoke(this.get("user"), "check");
      promise.then(
        () => { this.set("validationResult", "Model is checked - it's valid"); },
        () => { this.set("validationResult", "Model is checked - it's invalid"); }
      );
    },

    setGender(gender) {
      this.set("user.gender", gender);
    }

  }

});
