import Ember from 'ember';
import ValidationMixin from "ember-validation/mixins/validation";



export default Ember.Route.extend({

  model() {
    var container = this.get('container');

    var User = Ember.Object.extend(ValidationMixin, {
      validationScheme: {

        name: {
          validators: [
            { name: "required", options: { messages: {default: "name_required"} } }
          ]
        },

        email : {
          validators : [
            {name : 'required', options:{messages: {default: "email_required"}}},
            {name : 'email', options:{messages: {default: "invalid_email"}}}
          ]
        },

      },
      name: '',
      email: '',
      address: null
    });

    var Address = Ember.Object.extend(ValidationMixin, {
        validationScheme: {
          city: {
            validators: [{ name: "required", options: { messages: {default: "city_required"} } }]
          },
          street: {
            validators: [{ name: "required", options: { messages: {default: "street_required"} } }]
          },
          house: {
            validators: [{ name: "required", options: { messages: {default: "house_number_required"} } }]
          }
        },
        city:'',
        street:'',
        house: ''
      });


    var Credentials = Ember.Object.extend(ValidationMixin, {
      validationScheme: {
        login: {
          validators: [
            { name: "required", options: { messages: {default: "login_required"} } },
            { name: "regexp", options: {regexp: /^[\d\w]{4,12}$/, messages: {default: "login must contains from 4 till 12 alphanum symbols"}}}
          ]
        },
        password: {
          validators: [
            { name: "required", options: { messages: {default: "password_required"} } },
            { name: "regexp", options: {regexp: /^[\d\w]{8,24}$/, messages: {default: "pasword must contains from 8 till 24 alphanum symbols"}}}
          ]
        },
      },
      login: '',
      password: ''
    });

    var user = User.create({container}),
        address = Address.create({container}),
        credentials = Credentials.create({container});

    user.setProperties({address, credentials});
    return user;
  },

  actions: {
    saveUser() {
      window.alert('User saved!');
    }
  }
});
