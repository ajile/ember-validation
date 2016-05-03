import DS from "ember-data";
import ValidationMixin from "ember-validation/mixins/validation";

const { attr } = DS;

const User = DS.Model.extend(ValidationMixin, {
  username: attr("string", { required: true, max: 32 }),
  age: attr("number", { positive: true }),
  email: attr("email", { required:true })
});

export default User;
