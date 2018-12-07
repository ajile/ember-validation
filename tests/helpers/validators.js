import RSVP from 'rsvp';

export function failValidator(/*attributeName, context, options*/) {
  return RSVP.reject();
}
