import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return {name: '', participants_number:'', contact_email:''};
  },

  actions: {
    saveEvent(done) {
      typeof done === 'function' && done();
    }
  }
});
