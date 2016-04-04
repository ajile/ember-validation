import Ember from "ember";
import DS from "ember-data";
import ValidationMixin from "ember-validation/mixins/model";

const { computed } = Ember;
const { attr } = DS;

export var User = DS.Model.extend(ValidationMixin, {
  validationScheme: {
    name : {
      validators : [{name : 'required'}]
    },
    phone : {
      options: computed.not('context.email'),
      validators : [{name : 'required'}]
    },
    email : {
      options: computed.not('context.phone'),
      validators : [{name : 'required'}]
    }
  },
  name: attr("string"),
  phone: attr("string"),
  email: attr("string")
});

export default Ember.Route.extend({
  beforeModel() {
    // this.container._registry.register("model:user", User);
  },

  model() {
    var model = this.get('_model');

    if (!model) {
      model = this.store.createRecord("user");
      this.set('_model', model);
    }
    return model;
  },

  exit() {
    // this.container._registry.unregister("model:user");
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
    }
  }
});
