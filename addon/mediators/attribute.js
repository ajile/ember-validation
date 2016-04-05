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
  @module
  @augments module:addon/core/mediator
  @uses Ember.MutableArray
  @public
*/
export default BaseMediator.extend(Ember.MutableArray, {

  /**
    The list of the validators.
    @type {Array}
    @default Array
    @private
  */
  content: computed(() => Ember.A()),

  /**
    @type {module:addon/mediators/attribute~content}
  */
  length: computed("content", "content.length", function() {
    var content = get(this, 'content');
    return content ? get(content, 'length') : 0;
  }),

  /**
    @function
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
    @function
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
    @function
    @protected
    @return Ember.RSVP.Promise
  */
  _validate() {
    Ember.Logger.info('Validation : Mediator : Attribute ' + (this._onFocusIn ? 'mixin(ElementMediator)' : '') + ' : validate : ', this.get('attribute'));
    const promises = get(this, "content").map((validator) => {
      return validator.validate();
    });
    return RSVP.all(promises);
  },

  /**
    @function
    @protected
    @return Ember.RSVP.Promise
  */
  _check() {
    return this._validate(...arguments);
  }

});
