import Ember from 'ember';
import Base from 'ember-validation/core/validator';

const { RSVP: { defer }, get, getProperties, options } = Ember;

var Validator = Base.extend({

  messages: {
    "not_number": "not_number",
    "out_of_range": "out_of_range",
  },

  /**
    @method _validate
    @param {String} attributeName
    @param {Ember.Object} context
    @protected
    @final
    @return Ember.RSVP.Promise
  */
  _validate(attributeName, context, options={}) {
    const deferred = defer();
    const value = get(context, attributeName);
    console.log("value", value);
    const { min, max } = getProperties(options, "min", "max");

    if (!Validator.isNumber(value)) {
      return deferred.reject(this.get("messages.not_number")), deferred.promise;
    }

    if ((!Ember.isNone(min) || !Ember.isNone(max)) && !Validator.isInRange(value, min, max)) {
      deferred.reject(this.get("messages.out_of_range")), deferred.promise;
    }

    return deferred.promise;
  }

});

Validator.isNumber = (data) => !isNaN(parseFloat(data));
Validator.isInRange = (data, min, max) => (min && data < min) || (max && data > max);

export default Validator;