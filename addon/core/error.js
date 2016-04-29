import Ember from 'ember';

const { getProperties } = Ember;

/**
 * Error class.
 *
 * @module
 * @augments module:ember/Object
 */
export default Ember.Object.extend({

  /**
   * A key of the error. It can be used for translation needs.
   * @type String
   * @public
  */
  key: "",

  /**
   * A value of the attribute that is not valid.
   * @type String
   * @public
  */
  value: "",

  /**
   * Options the validator was invoked with.
   * @type Object
   * @public
  */
  options: {},

  /**
    @method toString
    @return {String}
  */
  toString: function() {
    const { key, value } = getProperties(this, "key", "value");
    return `<ValidationError("${key}" for "${value}")>`;
  }

});
