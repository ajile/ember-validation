import Ember from "ember";
import ValidationMixin from "ember-validation/mixins/validation";

const User = Ember.Object.extend(ValidationMixin, {
  validationScheme: {
    username: {
      validators: [ {name: "required"} ]
    }
  },
  username: null
});

export default User;
