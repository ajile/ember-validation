import Ember from "ember";
import FormValidation from "ember-validation/components/form-validation";

export default FormValidation.extend({

  promo_code: '',

  validationScheme: {
    // promo_code: {
    //   options : {selector : '[name="promo_code"]'},
    //   validators: [
    //     { name: "number", options: { min: 1, max: 9999, messages: {default: "must be number from 1 till 9999"} } }
    //   ]
    // },
  }

});
