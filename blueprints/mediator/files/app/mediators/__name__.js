import Ember from 'ember';
import BaseMediator from 'ember-validation/core/mediator';

const { RSVP } = Ember;

/**
  @class <%= classifiedModuleName %>Mediator
  @extends BaseMediator
  @public
*/
export default BaseMediator.extend({

  /**
    @method _validate
    @protected
    @return Ember.RSVP.Promise
  */
  _validate() {
    return RSVP.resolve();
  }

});
