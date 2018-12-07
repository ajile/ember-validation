import { resolve } from 'rsvp';
import Component from '@ember/component';
import ValidationComponent from "ember-validation/mixins/component";

export default Component.extend(ValidationComponent, {

  validate() {
    return resolve();
  }

});
