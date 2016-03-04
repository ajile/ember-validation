import Ember from "ember";

export default Ember.Controller.extend({

  user: Ember.computed(function() {
    return this.store.createRecord("user");
  }),

  actions: {

    simpleValidate() {
      this.get("user").validate();
    },

    setGender(gender) {
      this.set("user.gender", gender);
    }

  }

});
