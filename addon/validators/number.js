import Ember from 'ember';
import Base from 'ember-validation/core/validator';

const { RSVP: { defer }, get } = Ember;

export default Base.extend({

  /**
    @method _validate
    @param {String} attributeName
    @param {Ember.Object} context
    @protected
    @final
    @return Ember.RSVP.Promise
  */
  _validate: function (attributeName, context) {
    const deferred = defer();
    let value = get(context, attributeName);
        value = parseInt(value || 0);
    if (value < this.get("min") || value > this.get("max")) {
      deferred.reject(this.get("message"));
    }
    return deferred.promise;
  }

});
