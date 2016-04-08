import Ember from 'ember';

const { RSVP } = Ember;

function failValidator(/*attributeName, context, options*/) {
  this.trigger("failed");
  return RSVP.reject();
}

export default failValidator;
