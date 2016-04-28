import Ember from "ember";
import DS from "ember-data";
import ValidationMixin from "ember-validation/mixins/model";

const { computed } = Ember;
const { attr } = DS;

const GENDERS = {
  MALE: "male",
  FEMALE: "female",
  UNKNOWN: "",
};

export default DS.Model.extend(ValidationMixin, {

  /**
    @property _validationScheme
    @type Object
    @protected
    @final
  */
  validationScheme: {

    first_name: {
      validators: [
        { name: "required", options: { messages: {default: "first_name_required"} } }
      ]
    },

    last_name: {
      validators: [
        { name: "required", options: { messages: {default: "last_name_required"} } }
      ]
    },

    full_name: {
      validators: [
        { name: "required", options: { messages: {default: "full_name_required"} } }
      ]
    },

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
        {
          name: "number",
          options: { min: 21, max: 65, messages: {default: "age_is_wrong_for_male"}, condition: computed.equal("context.gender", GENDERS.MALE) }
        },
        {
          name: "number",
          options: { min: 18, max: 55, messages: {default: "age_is_wrong_for_female"}, condition: computed.equal("context.gender", GENDERS.FEMALE) }
        }
      ]
    },

    phone: {
      options: { condition: computed.not('context.email') },
      validators: [
        {
          name: 'required',
          options: { messages: { default: "phone_required" } }
        }
      ]
    },
    email: {
      options: { condition: computed.not('context.phone') },
      validators: [
        {
          name: 'required',
          options: { messages: { default: "email_required" } }
        },
        {
          name: 'email',
          options: { messages: { default: "email_wrong" } }
        }
      ]
    },
    city: {
      options: { condition: computed.or('context.street', 'context.house') },
      validators: [
        {
          name: 'required',
          options: { messages: { default: "city_required" } }
        }
      ]
    },
    street: {
      options: { condition: computed.or('context.city', 'context.house') },
      validators: [
        {
          name: 'required',
          options: { messages: { default: "street_required" } }
        }
      ]
    },
    house: {
      options: { condition: computed.or('context.city', 'context.street') },
      validators: [
        {
          name: 'required',
          options: { messages: { default: "house_number_required" } }
        }
      ]
    },


  },

  first_name: attr("string", {defaultValue:''}),
  last_name: attr("string", {defaultValue:''}),
  gender: attr("string", { defaultValue: GENDERS.UNKNOWN }),
  age: attr("number"),
  email: attr("string", {defaultValue:''}),
  phone: attr("string", {defaultValue:''}),
  city: attr("string", {defaultValue:''}),
  street: attr("string", {defaultValue:''}),
  house: attr("string", {defaultValue:''}),
  full_name: computed("first_name", "last_name", function() {
    return [this.get("first_name"), this.get("last_name")].join(" ");
  })

});
