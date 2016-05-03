import Ember from "ember";
import ValidationMixin from "ember-validation/mixins/validation";

const GENDER = {
  MALE: "male",
  FEMALE: "female",
  UNKNOWN: "",
};

const User = Ember.Object.extend(ValidationMixin, {

  validationScheme: {
    age: {
      options: {
        // Attribute will be validated when gender will be set. Til gender is
        // unknown this field is not required.
        condition: computed.not("isUnknownGender")
      },
      validators: [

      	// This field is required
        { name: "required" },

        // For women age should be greated then 18
        { name: "number", options: { min: 18, condition: computed.bool("context.isFemaleGender") } },

        // For men age should be greated then 21
        { name: "number", options: { min: 21, condition: computed.bool("context.isMaleGender") } }

      ]
    }
  },

  age: null,
  gender: GENDER.UNKNOWN,

  isUnknownGender: computed.equal("context.gender", GENDERS.UNKNOWN)
  isMaleGender: computed.equal("context.gender", GENDERS.MALE)
  isFemaleGender: computed.equal("context.gender", GENDERS.FEMALE)

});

export default User;
