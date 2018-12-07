import Controller from '@ember/controller';

export default Controller.extend({

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
