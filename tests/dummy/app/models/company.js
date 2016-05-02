import Ember from "ember";
import DS from "ember-data";
import ValidationMixin from "ember-validation/mixins/model";

const { computed } = Ember;
const { attr } = DS;

export default DS.Model.extend(ValidationMixin, {
  name: attr("string", { required: true }),
  age: attr("number", { max: 5 })
});
