import Ember from 'ember';

/**
 * @module ember-validation/mixins/element-mediator
 * @extends Ember.Mixin
 */
export default Ember.Mixin.create({

  /** @type {Ember.Component} */
  view : null,

  'validate-path': '',

  /**
   * Attach event listeners to view
   *
   * @function
   * @returns {undefined}
   */
  viewDidChange: Ember.on('init', Ember.observer('view', function () {
    const view = this.get('view');

    if (view) {
      view
        .on('focusIn', this, this._onFocusIn)
        .on('focusOut', this, this._onFocusOut);
    }
  })),

  /**
   * Remove event listeners from view befor destroy
   *
   * @function
   * @returns {undefined}
   */
  willDestroy() {
    var view = this.get('view');

    if (view) {
      view
        .off('focusIn', this, this._onFocusIn)
        .off('focusOut', this, this._onFocusOut);

      this.set('view', null);
    }
  },

  errorsName: Ember.computed.or('view.errors-name', 'validate-path'),

  /**
   * Trigger event after view focused in
   *
   * @function
   * @fires hideErrors
   * @returns {undefined}
   */
  _onFocusIn() {
    this.trigger('hideErrors', this.get('errorsName'));
  },

  /**
   * Validate and trigger event after view focused out
   *
   * @function
   * @fires showErrors
   * @returns {undefined}
   */
  _onFocusOut() {
    this.trigger('showErrors', this.get('errorsName'));
    this.validate();
  }

});
