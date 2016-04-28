import Ember from 'ember';

/**
  @module
  @function merge
  @return Object
*/
export default function() {
  return Ember.$.extend(...arguments);
}
