import Ember from 'ember';

const { getProperties } = Ember;

/**
 * Error class.
 *
 * @module
 * @augments module:ember/Object
 */
export default Ember.Object.extend({

  key: "",

  value: "",

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
