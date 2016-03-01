import Ember from 'ember';
import Base from 'ember-validation/core/validator';

const { RSVP, get } = Ember;

export default Base.extend({

  /**
    Default error message. It will be shown in common case.
    @property message
    @type String
  */
  message: "email_invalid",

  /**
    @method _validate
    @param {String} attributeName
    @param {Ember.Object} context
    @param {Ember.Object} context
    @abstract
    @private
    @return Ember.RSVP.Promise
  */
  _validate: function (attributeName, context) {
    const deferred = RSVP.defer();
    const value = get(context, attributeName);
    if (Ember.isBlank(value)) { deferred.resolve(); return deferred.promise; }
    value.search(/@/) === -1 ? deferred.reject(this.message) : deferred.resolve();
    return deferred.promise;
  }

});
