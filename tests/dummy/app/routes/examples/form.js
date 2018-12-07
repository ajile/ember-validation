import Route from '@ember/routing/route';

export default Route.extend({

  model() {
    var model = this.get('_model');

    if (!model) {
      model = this.store.createRecord("user");
      this.set('_model', model);
    }
    return model;
  },

  actions : {
    setUser : function (type) {
      var user = this.store.createRecord("user");

      if (type === 'edit') {
        user.setProperties({
          id: 1,
          first_name: 'Ivan',
          last_name: 'Ivanov',
          email : 'bla@gmail.com',
          phone: '+79231231212',
          gender: 'male',
          age:40
        });
      }

      this.set('_model', user);

      this.refresh();
    },

    saveUser(done) {
      typeof done === 'function' && done();
    }
  }
});
