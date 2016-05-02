import Ember from "ember";

const { get } = Ember;

export default Ember.Object.extend({

  evolve() {
  	const options = this.get("options");
  	const scheme = { options, validators: [] };

  	get(options, "required") && scheme.validators.push({ "name": "required" });

  	scheme.validators.push({ "name": "number", options });

  	return scheme;
  }

});
