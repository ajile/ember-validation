import Ember from 'ember';

/**
 * @module ember-validation/utils/merge
 */

/**
 * @function
 * @return {Object}
 */
export default function() {
  return Ember.$.extend(true, ...arguments);
}
