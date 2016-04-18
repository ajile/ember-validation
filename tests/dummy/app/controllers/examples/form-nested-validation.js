import Ember from 'ember';

export default Ember.Controller.extend({

  modelWasSaved: false,

  actions: {
    saveUser(done) {
      this.set('modelWasSaved', true);
    }
  }
});
