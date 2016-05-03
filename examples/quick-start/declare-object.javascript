import Ember from "ember";
import ValidationMixin from "ember-validation/mixins/validation";

const User = Ember.Object.extend(ValidationMixin, {
  validationScheme: {
    username: {
      validators: [
        { name: "required" },
        { name: "string", options: { max: 32 } }
      ]
    },
    age: {
      validators: [
        { name: "number", options: { min: 0 } }
      ]
    },
    email: {
      validators: [
        { name: "required" },
        { name: "email" }
      ]
    }
  },
  username: null,
  age: null,
  email: null,
});

export default User;
