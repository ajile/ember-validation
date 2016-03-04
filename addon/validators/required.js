import Ember from 'ember';
import Base from 'ember-validation/core/validator';

const { RSVP: {resolve, reject}, get, isBlank } = Ember;

export default Base.extend({

  /**
    The flag means that blank values should be validated as well.
    @property blankValue
    @type Boolean
  */
  blankValue: true,

  /**
    @method _validate
    @param {String} attributeName
    @param {Ember.Object} context
    @protected
    @final
    @return Ember.RSVP.Promise
  */
  _validate: function (attributeName, context) {
    const value = get(context, attributeName);
    return isBlank(value) ? reject(this.get("messages.default")) : resolve();
  }

});
