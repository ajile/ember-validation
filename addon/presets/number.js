import Ember from "ember";
import BasePreset from 'ember-validation/core/preset';

const { get } = Ember;

/**
 * @module
 * @augments module:addon/core/preset
 * @public
 */
export default BasePreset.extend({

  /**
   * @function
   * @param {Object} scheme
   * @param {Object} options
   * @return {Object}
   * @private
   */
  _evolve(scheme, options) {
  	scheme.validators.push({ "name": "number", options });
    return scheme;
  }

});
