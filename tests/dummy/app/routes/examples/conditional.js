import Ember from "ember";
import DS from "ember-data";
import ValidationMixin from "ember-validation/mixins/model";

const { computed } = Ember;
const { attr } = DS;

export var Model1 = DS.Model.extend(ValidationMixin, {
  validationScheme: {
    age: {
      options: {
        condition: computed.bool("context.validateAge")
      },
      validators: [
        { name: "required" },
        { name: "number" }
      ]
    },
  },
  age: attr("number"),
  validateAge: attr('boolean', { defaultValue: false })
});

export var Model2 = DS.Model.extend(ValidationMixin, {
  validationScheme: {
    age: {
      validators: [
        { name: "required" },
        { name: "number", options: { condition: computed.equal("context.gender", "male"), min: 10, max: 20 } },
        { name: "number", options: { condition: computed.equal("context.gender", "female"), min: 15, max: 25 } },
      ]
    },
  },
  age: attr("number", { defaultValue: 12 }),
  gender: attr("string", { defaultValue: "male" })
});

export default Ember.Route.extend({

  beforeModel() {
    this.container._registry.register("model:model-1", Model1);
    this.container._registry.register("model:model-2", Model2);
  },

  model() {
    return {
      "model_1": this.store.createRecord("model-1"),
      "model_2": this.store.createRecord("model-2"),
    };
  },

  exit() {
    this.container._registry.unregister("model:model-1");
    this.container._registry.unregister("model:model-2");
  }

});
