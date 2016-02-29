import Ember from "ember";

export default Ember.Controller.extend({

  actions: {
    validate() {
      var promise = this.get("model").validate();
      promise.then(() => console.log("valid"));
      promise.catch(() => console.log("invalid"));
    }
  }

});
