import Ember from 'ember';

export default Ember.Mixin.create({
  /** @type {Ember/Component} */
  view : null,

  viewDidChange: Ember.on('init', Ember.observer('view', function () {
    let view = this.get('view');

    if (view) {
      view
        .on('focusIn', this, this._onFocusIn)
        .on('focusOut', this, this._onFocusOut)

    }
  })),

  willDestroy() {
    var view = this.get('view');

    if (view) { console.log('willDestroy', this)
      view
        .off('focusIn', this, this._onFocusIn)
        .off('focusOut', this, this._onFocusOut);

      this.set('view', null);
    }
  },

  _onFocusIn() {
    this.trigger('hideErrors', this.get('attribute'));
  },

  _onFocusOut() {
    this.trigger('showErrors', this.get('attribute'));
    this.validate();
  },
});
