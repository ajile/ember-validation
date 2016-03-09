import Ember from "ember";

export default Ember.Controller.extend({

  actions: {

    validateModel1() {
      this.get("model.model_1").validate();
    },

    validateModel2() {
      this.get("model.model_2").validate();
    },

    setGender(gender) {
      this.set("model.model_2.gender", gender);
    }

  }

});
