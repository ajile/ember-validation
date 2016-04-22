import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return Ember.Object.create({name: '', participants_number:'', contact_email:''});
  },

});
