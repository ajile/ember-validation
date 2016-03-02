import Ember from 'ember';
import BaseValidator from 'ember-validation/core/validator';

const { RSVP: {resolve, reject}, get } = Ember;

/**
  @class <%= classifiedModuleName %>Validator
  @extends BaseValidator
  @public
*/
export default BaseValidator.extend({

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
    return value ? reject(this.get("message")) : resolve();
  }

});
