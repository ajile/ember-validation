import Ember from 'ember';

const { RSVP } = Ember;

export function failValidator(/*attributeName, context, options*/) {
  this.trigger("failed");
  return RSVP.reject();
}
