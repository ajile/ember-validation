import Ember from 'ember';

const { getProperties } = Ember;

/**
 * @module ember-validation/core/error
 * @extends Ember.Object
 */
export default Ember.Object.extend({

  /**
   * A key of the error. It can be used for translation needs.
   * @type String
   * @public
   */
  key: "",

  /**
   * A value of the attribute that is not valid.
   * @type String
   * @public
   */
  value: "",

  /**
   * Options the validator was invoked with.
   * @type Object
   * @public
   */
  options: { },

  /**
   * An error's extra data. In common case contains preprocessed data for using
   * in locale files. The most popular addon for translation doesn't support
   * Handlebar helpers in locale dicts.
   *
   * Property might be set by a validator or mediator for purpose of showing in
   * template.
   *
   * For instance validator `date` when `options.min` is sent, checks that
   * date-to-check is greater then date in `options.min`. If it's not -
   * validator raises an error with a translation key. Then we show a human-error in
   * accordance with that key.

   * But how to notice user about min date? We could place error phrase like
   * "You should set date greater then {{options.min}}", but in this case user
   * will see something like that: "You should set date greater then Tue Dec 06
   * 2016 15:09:43 GMT+0300 (MSK)". It's not readable. But we can not to use
   * helpers (like `format-date`) inside the translation phrases - it doesn't
   * work.
   *
   * For this purpose this property was created. Validators will pass extra data
   * to the error, that we can show to user.
   *
   * @type Object
   * @public
   */
  extra: { },

  /**
    @method toString
    @return {String}
   */
  toString: function() {
    const { key, value } = getProperties(this, "key", "value");
    return `<ValidationError("${key}" for "${value}")>`;
  }

});
