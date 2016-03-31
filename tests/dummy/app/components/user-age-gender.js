import Ember from "ember";
import ComponentVaidation from 'ember-validation/mixins/component';
// import layout from '../templates/components/user-age-gender';

const { computed } = Ember;

const GENDERS = {
  MALE: "male",
  FEMALE: "female",
  UNKNOWN: "",
};

export default Ember.Component.extend(ComponentVaidation, {
  // layout: layout
  isNested: true,

  validationScheme: {
    gender: {
      validators: [
        { name: "required", options: { messages: {default: "gender_is_required"} } }
      ]
    },

    age: {
      options: {
        isUnknown: computed.equal("context.gender", GENDERS.UNKNOWN),
        condition: computed.not("isUnknown")
      },
      validators: [
        { name: "number", options: { min: 21, max: 65, messages: {default: "age_is_wrong_for_male"}, condition: computed.equal("context.gender", GENDERS.MALE) } },
        { name: "number", options: { min: 18, max: 55, messages: {default: "age_is_wrong_for_female"}, condition: computed.equal("context.gender", GENDERS.FEMALE) } }
      ]
    },
  },

  // age: computed.alias('validation-context.age'),

  // gender: computed.alias('validation-context.gender'),

  initValidation() {
    var mediators;

    if (this.get('element')) {
      this._super();
      console.log('nested mediators.length', this.get('mediators.length'))
    }
  }
});

