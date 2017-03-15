import Ember from "ember";

const { get } = Ember;

/**
 * @module ember-validation/core/preset
 * @extends Ember.Object
 */
export default Ember.Object.extend({

  /**
   * @type Object
   * @default {}
   * @public
   */
  options: {},

  /**
   * @function
   * @return {Object} scheme validation
   * @public
   */
  evolve() {
    const options = this.get("options"),
          scheme = { options, validators: [] };

    get(options, "required") && scheme.validators.push({ "name": "required" });

    return this._evolve(scheme, options);
  },

  /**
   * @function
   * @param {Object} scheme
   * @param {Object} options
   * @return {Object}
   * @private
   */
  _evolve(scheme) {
    return scheme;
  }

});
