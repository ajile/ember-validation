import Controller from '@ember/controller';

export default Controller.extend({

  modelWasSaved: false,

  actions: {
    saveUser() {
      this.set('modelWasSaved', true);
    }
  }
});
