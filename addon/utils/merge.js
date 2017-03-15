import Ember from 'ember';

/**
 * @module ember-validation/utils/lookup
 */

/**
 * @function
 * @return {Object}
 */
export default function() {
  return Ember.$.extend(true, ...arguments);
}
