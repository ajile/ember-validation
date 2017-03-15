import Ember from 'ember';
import Config from 'ember-validation/configuration';
import BaseMediator from 'ember-validation/core/mediator';

const { get, computed, RSVP } = Ember;

export function objectAt(content, idx) {
  if (content.objectAt) {
    return content.objectAt(idx);
  }

  return content[idx];
}

/**
 * @module ember-validation/mediators/attribute
 * @extends module:ember-validation/core/mediator
 * @augmented Ember.MutableArray
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

    const deferred = RSVP.defer();

    Config.LOG_VALIDATION && Ember.Logger.log("Validation : <<mediator>> : Attribute : _validate '%s'", this.get('attribute'));

    const promises = get(this, "content").map((validator) => {
      return validator.validate();
    });

    const settledPromise = RSVP.allSettled(promises, "All validators done");

    settledPromise.then((results) => {
      const rejected = Ember.A(results).filterBy("state", "rejected");
      if (rejected.length === 0) {
        deferred.resolve();
      } else {
        deferred.reject(Ember.A(rejected).mapBy("reason"), "Mediator attribute rejects the promise");
      }
    });

    return deferred.promise;
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
