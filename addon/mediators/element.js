import Ember from 'ember';
import BaseMediator from 'ember-validation/core/mediator';

const { RSVP, run, get, Logger } = Ember;

/**
  @class ElementMediator
  @extends BaseMediator
  @public
*/
export default BaseMediator.extend({

  view : null,

  /**
    Attach events handlers to view event

    @method _addEventHandlers
    @on init
    @private
    @return undefined
  */
  _addEventHandlers: Ember.on('init', function () {
    this.get('view')
      .on('focusIn', this, this._onFocusIn)
      .on('focusOut', this, this._onFocusOut);

    Logger.info('Validation : Mediator : Element : created : ', get(this, 'validate-path'));
  }),

  /**
    Remove events handlers from view before destroy

    @method willDestroy
    @public
    @return undefined
  */
  willDestroy() {
    this.get('view')
      .off('focusIn', this, this._onFocusIn)
      .off('focusOut', this, this._onFocusOut);
  },

  /**
    Trigger `focusIn` event

    @method _onFocusIn
    @private
    @return undefined
  */
  _onFocusIn : function () {
    this.trigger('focusIn', get(this, 'view.validate-path'), get(this, 'view'));
  },

  /**
    Call `validate` and trigger `focusOut` event

    @method _onFocusOut
    @private
    @return undefined
  */
  _onFocusOut : function () {
    var view = get(this, 'view'),
        path = get(this, 'view.validate-path');

    this._validate().then(() => this.trigger('passed', path, view), (message) => this.trigger('failed', path, message, view));

    this.trigger('focusOut', path, view);
  },

  /**
    @method _validate
    @protected
    @return Ember.RSVP.Promise
  */
  _validate() {
    Logger.info('Validation : Mediator : Element : validate : ', get(this, 'view.validate-path'));
    return Ember.tryInvoke(this.get('context'), 'validate', [this.get('view.validate-path')]) || RSVP.resolve();
  }

});
