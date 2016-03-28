import Ember from 'ember';
import BaseMediator from 'ember-validation/core/mediator';

const { get, computed, RSVP } = Ember;

export function objectAt(content, idx) {
  if (content.objectAt) {
    return content.objectAt(idx);
  }

  return content[idx];
}

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
    @private
  */
  content: computed(() => Ember.A()),

  /**
    @property length
    @type Number
  */
  length: computed("content", "content.length", function() {
    var content = get(this, 'content');
    return content ? get(content, 'length') : 0;
  }),

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
    Should actually retrieve the object at the specified index from the
    content. You can override this method in subclasses to transform the
    content item to something new.
    This method will only be called if content is non-`null`.
    @method objectAtContent
    @param {Number} idx The index to retrieve.
    @return {Object} the value or undefined if none found
    @private
  */
  objectAtContent(idx) {
    return objectAt(get(this, 'content'), idx);
  },

  objectAt(idx) {
    return get(this, 'content') && this.objectAtContent(idx);
  },

  /**
    @method _validate
    @protected
    @return Ember.RSVP.Promise
  */
  _validate() {
    const promises = get(this, "content").map((validator) => {
      return validator.validate();
    });
    return RSVP.all(promises);
  },

  /**
    @method _check
    @protected
    @return Ember.RSVP.Promise
  */
  _check() {
    return this._validate(...arguments);
  }

});
