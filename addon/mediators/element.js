import Ember from 'ember';
import BaseMediator from 'ember-validation/core/mediator';

const { RSVP } = Ember;

/**
  @class ElementMediator
  @extends BaseMediator
  @public
*/
export default BaseMediator.extend({

  element : null,

  validPath : '',

  addEventHandlers: Ember.on('init', function () {
    console.log(this.get('element').$())

    this._onFocusIn = this._onFocusIn.bind(this)
    this._onFocusOut = this._onFocusOut.bind(this)

    this.get('element').$()
      .on('focusin', this._onFocusIn)
      .on('focusout', this._onFocusOut);
  }),

  willDestroy() {
    this.get('element').$()
      .off('focusin', this._onFocusIn)
      .off('focusout', this._onFocusOut);

  },

  _onFocusIn : function () {
    console.log('focusin', this.get('validPath'))

    this.trigger('focusin');
  },

  _onFocusOut : function () {
    console.log('focusout', this.get('validPath'))
    Ember.tryInvoke(this.get('context'), 'validate', [this.get('validPath')]);
    this.trigger('focusout');
  },

  /**
    @method _validate
    @protected
    @return Ember.RSVP.Promise
  */
  _validate() {
    return RSVP.resolve();
  }

});
