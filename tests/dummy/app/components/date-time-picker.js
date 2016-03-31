import Ember from "ember";
import ValidationComponent from "ember-validation/mixins/component";

export default Ember.Component.extend(ValidationComponent, {

  validate() {
    console.log('Validate')
    return Ember.RSVP.resolve()
  }

});
