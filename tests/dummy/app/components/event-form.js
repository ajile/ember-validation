import Ember from "ember";
import FormValidation from "ember-validation/components/form-validation";

const { computed } = Ember;

export default FormValidation.extend({

  modelWasSaved: false,

  name: computed.alias('validation-context.name'),

  participants_number: computed.alias('validation-context.participants_number'),

  contact_email: computed.alias('validation-context.contact_email'),

  validationScheme: {
    name: {
      options : {selector : '[name="name"]'},
      validators : [
        {name : 'required', options:{messages: {default: "name_required"}}},
        {name: 'string', options: {min: 3, messages: {out_of_range: 'must be at leat 3 symbols'}}},
        {name: 'string', options: {max: 15, messages: {out_of_range: 'max length 15 symbols'}}},
      ]
    },
    participants_number: {
      options : {selector : '[name="participants_number"]'},
      validators : [
        {name : 'required', options:{messages: {default: "participants_number_required"}}},
        {name: 'number', options: {min: 2, max:100, messages: {not_number: 'must be a number', out_of_range: 'must be from 2 till 100'}}}
      ]
    },
    contact_email: {
      options : {selector : '[name="email"]'},
      validators: [
        {name : 'required', options:{messages: {default: "contact_email_required"}}},
        {name: 'email', options: {messages:{default: 'must_be_valid_email'}}}
      ]
    }

  },

  didInsertElement() {
    this._super(...arguments);

    this.$().on('focus', 'input', () => { this.set('modelWasSaved', false); })
  },

  /**
  * Callback for submit passed
  *
  * @function
  * @returns {undefined}
  */
  onSubmitDone() {console.log('SAVED')
    this.set('modelWasSaved', true);
  },
});
