import DS from "ember-data";
import ValidationMixin from "ember-validation/mixins/validation";

const { attr } = DS;

export default DS.Model.extend(ValidationMixin, {
  name: attr("string", { required: true, isValidatable: true }),
  email: attr("string", { preset: "email", required: true, isValidatable: true }),
  age: attr("number", { max: 5, isValidatable: true })
});
