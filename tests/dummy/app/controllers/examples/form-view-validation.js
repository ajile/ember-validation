import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    saveEvent(done, failed) {
      Ember.run.later(this, () => {
        typeof done === 'function' && done();
        // typeof failed === 'function' && failed('Unknown error');
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
