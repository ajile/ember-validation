import Ember from 'ember';

export default Ember.Controller.extend({

  modelWasSaved: false,

  actions: {
    saveUser() {
      this.set('modelWasSaved', true);
    }
  }
});
