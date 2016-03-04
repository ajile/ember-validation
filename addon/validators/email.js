import Ember from 'ember';
import Base from 'ember-validation/core/validator';

const { RSVP, get } = Ember;

export default Base.extend({

  /**
    Error messages. It should be redefined in child classes.
    @property messages
    @type Object
  */
  messages: {
    default: "email_invalid"
  },

  /**
    @method _validate
    @param {String} attributeName
    @param {Ember.Object} context
    @protected
    @final
    @return Ember.RSVP.Promise
  */
  _validate: function (attributeName, context) {
    const deferred = RSVP.defer();
    const value = get(context, attributeName);
    if (Ember.isBlank(value)) { deferred.resolve(); return deferred.promise; }
    value.search(/@/) === -1 ? deferred.reject(this.get("messages.default")) : deferred.resolve();
    return deferred.promise;
  }

});
