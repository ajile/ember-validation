import Ember from "ember";
import ValidationComponent from "ember-validation/mixins/component";

export default Ember.Component.extend(ValidationComponent, {

  validate() {
    return Ember.RSVP.resolve();
  }

});
