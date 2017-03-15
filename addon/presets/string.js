import BasePreset from 'ember-validation/core/preset';

/**
 * @module ember-validation/presets/string
 * @extends module:ember-validation/core/preset
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
  	scheme.validators.push({ "name": "string", options });
    return scheme;
  }

});
