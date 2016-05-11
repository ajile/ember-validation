import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    saveUser(done) {
      // Ember.run.later(this, () => {
        typeof done === 'function' && done();
      // }, 500);
    },

    reset() {

    }
  }
});
