import Ember from 'ember';
import BaseMediator from 'ember-validation/core/mediator';

const { get, computed, RSVP } = Ember;

/**
  @class AttributeMediator
  @module ember-validation/mediators
  @extends BaseMediator
  @uses Ember.MutableArray
  @public
*/
export default BaseMediator.extend(Ember.MutableArray, {

  /**
    The list of the validators.
    @property content
    @type Ember.Array
  */
  content: computed(() => Ember.A()),

  /**
    @method replace
    @param {Any} idx
    @param {Object} amt
    @param {Object} objects
  */
  replace(idx, amt, objects) {
    get(this, 'content') && get(this, 'content').replace(idx, amt, objects);
  },

  /**
    @method _validate
    @private
    @return Ember.RSVP.Promise
  */
  _validate() {
    const promises = get(this, "content").map((validator) => validator.validate());
    return RSVP.all(promises);
  }

});
