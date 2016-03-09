import Ember from 'ember';
import Base from 'ember-validation/core/validator';

const { RSVP: { defer }, get, getProperties } = Ember;

var Validator = Base.extend({

  messages: {
    "not_number": "not_number",
    "out_of_range": "out_of_range",
  },

  /**
    @method _validate
    @param {String} attributeName
    @param {Ember.Object} context
    @param {Object} options  Validation additional options
    @protected
    @final
    @return Ember.RSVP.Promise
  */
  _validate(attributeName, context, options={}) {
    const deferred = defer();
    const value = get(context, attributeName);
    const { min, max } = getProperties(options, "min", "max");

    if (!Validator.isNumber(value)) {
      return deferred.reject(this.get("messages.not_number")), deferred.promise;
    }

    if (!Ember.isNone(min) && value < min) {
      return deferred.reject(this.get("messages.out_of_range")), deferred.promise;
    }

    if (!Ember.isNone(max) && value > max) {
      return deferred.reject(this.get("messages.out_of_range")), deferred.promise;
    }

    deferred.resolve();

    return deferred.promise;
  }

});

Validator.isNumber = (data) => !isNaN(parseFloat(data));

export default Validator;
