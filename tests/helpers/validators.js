import Ember from 'ember';
import BaseValidator from 'ember-validation/core/validator';

const { RSVP } = Ember;

export var FailValidator = BaseValidator.extend({

  messages: {
    default: "failed"
  },

  _validate() {
    this.trigger("failed");
    return RSVP.reject();
  }

});
