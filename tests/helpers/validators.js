import Ember from 'ember';

const { RSVP } = Ember;

export function failValidator(/*attributeName, context, options*/) {
  return RSVP.reject();
}
