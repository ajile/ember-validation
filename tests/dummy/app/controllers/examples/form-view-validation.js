import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    saveEvent(done) {
      Ember.run.later(this, () => {
        typeof done === 'function' && done();
      }, 500);
    },

    reset() {
      this.get('model').setProperties({
        name: '',
        participants_number: '',
        contact_email: ''
      });
    }
  }
});
