import Ember from 'ember';
import ValidationMixin from 'ember-validation/mixins/validation';
import ElementMediator from 'ember-validation/mediators/element';
import ElementProxyMediator from 'ember-validation/mediators/element-proxy';

const { get, computed, observer, A, isArray, Instrumentation, on } = Ember;

/**
  @module
  @augments module:ember/ArrayProxy
  @public
*/
var ErrorsProxy = Ember.ArrayProxy.extend({

  /**
    @type Array
    @private
  */
  _content: Ember.A(),

  /**
    Adds error messages to a given attribute.

    @param {String} attribute
    @param {(Array|String)} messages
    @method remove
  */
  add(attribute, message) {
    var item = this._find(attribute);

    if (!item) {
      item = {attribute, messages: A()};
      this.get('_content').addObject(item);
    }

    if (!message) {
      message = 'unknown error';
    }

    if (!item.messages.findBy('message', message)) {
      item.messages.addObject({message})
    }
  },

  /**
    Removes all error messages from the given attribute.

    @param {String} attribute
    @method remove
  */
  remove(attribute) {
    var item = this._find(attribute);

    if (item) {
      this.get('_content').removeObject(item);
    }
  },

  /**
    Removes all error messages.

    @method remove
  */
  clear() {
    this.get('_content').clear();
    this._super();
  },

  /**
    @method unknownProperty
  */
  unknownProperty(attribute) {
    var item = this._find(attribute);

    return item ? get(item, 'messages') : this.get('content.'+attribute);
  },

  /**
    @property length
  */
  length: computed('content.length', '_content.length', function () {
    return this.get('content.length') + this.get('_content.length');
  }),

  /**
    Find item in _content by attribute name

    @param {String} attr name
    @return {Object|undefined}
    @method _find
  */
  _find(attribute) {
    return this.get('_content').findBy('attribute', attribute);
  }
});






function onMediatorFocusIn() {
  this.trigger('focusIn', this);
}

function onMediatorFocusOut() {
  this.trigger('focusOut', this);
}

/**
 * @module
 * mixin
 * @augments ember/Mixin
 * @mixes ember-validation/mixins/validation
 */
export default Ember.Mixin.create(ValidationMixin, {

  /** @type {Object} */
  subscriber: null,

  /** @type {ember/Array} */
  'validation-context' : computed(() => {return {};}),

  /** @type {ember/Array} */
  visibleErrors: computed(() => {return {};}),

  /**
   * Initialize errors
   *
   * @function
   * @returns {undefined}
   */
  initErrors() {
    this.set('errors', ErrorsProxy.create({content: this.get('validation-context.errors') || A()}));
  },

  /**
   * Initialize validation
   *
   * @function
   * @returns {undefined}
   */
  initValidation() {
    var mediators;

    if (this.get('element')) {
      this.get('childViews').forEach((view) => { this._addMediatorForView(view); });
      this._super();
    }

  },

  /**
   * Clear validation
   *
   * @function
   * @returns {undefined}
   */
  clearValidation() {
    this.get('mediators').slice().forEach((mediator) => { this.removeMediator(mediator); });
  },

  /**
   * Reset validation
   *
   * @function
   * @returns {undefined}
   */
  resetValidation() {
    this.clearValidation();
    this.initValidation();
  },

  /**
   * Reset errors
   *
   * @function
   * @returns {undefined}
   */
  resetErrors() {
    this.clearErrors();
    this.initErrors();
  },

  /**
   * Return true if view is validable child
   *
   * @function
   * @returns {Boolean}
   */
  isChild(view) {

    if (this.get('childViews').indexOf(view) === -1) {
      return;
    }

    while (view.parentView) {
      if (view.parentView.get('isValidatable')) {
        return Ember.isEqual(view.parentView, this);
      }
      view = view.parentView;
    }
  },

  /**
   * Init validation on `didInsertElement`
   *
   * @function
   * @returns {undefined}
   */
  _onDidInsertElement : on('didInsertElement', function () {
    this.initValidation();
  }),

  /**
   * Reset validation and errors on context did change
   *
   * @function
   * @returns {undefined}
   */
  _onContextDidChange: observer('validation-context', function () {
    this.resetErrors();
    this.resetValidation();
  }),

  /**
   * Do some initilaze stuffs for some types of mediators
   *
   * @function
   * @param {Mediator} mediator
   * @returns {undefined}
   */
  _onMediatorDidAdd: on('mediatorDidAdd', function (mediator) {
    var view = get(mediator, 'view'),
        selector = get(mediator, 'options.selector');

    if (selector) {
      if (this.get('element')) {
        this._bindMediatorToElement(mediator, selector)
      } else {
        this.on('didInsertElement', () => { this._bindMediatorToElement(mediator, selector); })
      }
    } else if (view) {
      this._addViewEventsHadlers(view, mediator);
    }

    if (view || selector) {
      mediator
        .on('passed', this, this._triggerValidatePassed)
        .on('failed', this, this._triggerValidateFailed)
        .on('focusIn', this, this._hideErrors)
        .on('focusOut', this, this._runMediator);
    }

  }),

  /**
   * Do some stuffs before mediator will destroy
   *
   * @function
   * @param {Mediator} mediator
   * @returns {undefined}
   */
  _onMediatorWillDestroy: on('mediatorWillRemove', function (mediator) {
    let view = get(mediator, 'view');

    if (view) {
      mediator
        .on('passed', this, this._triggerValidatePassed)
        .on('failed', this, this._triggerValidateFailed)
        .on('focusIn', this, this._hideErrors)
        .on('focusOut', this, this._runMediator);

      view
        .off('focusIn', mediator, onMediatorFocusIn)
        .off('focusOut', mediator, onMediatorFocusOut);

      this._hideErrors(mediator);

      mediator.set('view', null);
    }

  }),

  /**
   * Connect mediator to view using events
   *
   * @function
   * @param {Mediator} mediator
   * @param {String} selector
   * @returns {undefined}
   */
  _bindMediatorToElement(mediator, selector) {
    var element = this.$(selector),
        view = this.get('container').lookup('-view-registry:main')[element.attr('id')];
console.log('_bindMediatorToElement', mediator, selector)
    if (view) {
      this._addViewEventsHadlers(view, mediator);
      mediator.set('view', view);
    }
  },

  /**
   * Add `focusin`, `focusout`, `willDestroyElement` events listeners to view
   *
   * @function
   * @param {Mediator} mediator
   * @param {String} selector
   * @returns {undefined}
   */
  _addViewEventsHadlers(view, mediator) {
    view
      .on('focusIn', mediator, onMediatorFocusIn)
      .on('focusOut', mediator, onMediatorFocusOut)
      .on('willDestroyElement', () => { get(mediator, 'view') && this.removeMediator(mediator); });
  },

  /**
   * Hide errors for for given mediator
   *
   * @function
   * @param {Mediator} mediator
   * @returns {undefined}
   */
  _hideErrors(mediator) {
    let errorsName = mediator.get('attribute') || get(mediator, 'options.errorsName') || get(mediator, 'view.errors-name');
    this.set('visibleErrors.' + errorsName, false);
  },

  /**
   * Call mediator `validate` method
   *
   * @function
   * @param {Mediator} mediator
   * @returns {undefined}
   */
  _runMediator(mediator) {
    var errorsName = get(mediator, 'options.errorsName') || get(mediator, 'view.errors-name'),
        attribute = errorsName || get(mediator, 'attribute'),
        promise = mediator.validate();

    if (errorsName) {
        promise.then(() => { this.get('errors').remove(attribute); }, () => {});
        promise.catch((error) => {
          this.get('errors').remove(attribute);
          this.get('errors').add(attribute, error);
        });
    }

    if (attribute) {
      promise.finally(() => {
        this.set('visibleErrors.' + attribute, true);
        this.get('errors').notifyPropertyChange(attribute);
      });
    }

  },

  /**
   * Create mediator for given view
   *
   * @function
   * @param {Ember/View} view
   * @returns {undefined}
   */
  _createElementMediator(view) {
    var attribute = get(view, 'validate-path'),
        mediator;

    if (attribute) {
      mediator = ElementMediator.create({context : this.get('validation-context'), attribute, view});
    } else if (get(view, 'isValidatable')) {
      mediator = ElementProxyMediator.create({view});
    }

    return mediator;
  },

  /**
   * Add mediator for given view if not exits
   *
   * @function
   * @param {Ember/View} view
   * @returns {undefined}
   */
  _addMediatorForView(view) {
    var mediator;

    if (!this.get('mediators').findBy('view', view) && (mediator = this._createElementMediator(view))) {
      this.addMediator(mediator);
      return true;
    }
  },

  /**
   * Check new rendered childs views to be registered for validation
   *
   * @function
   * @returns {undefined}
   */
  _subscribe: on('didInsertElement', function () {
    var subscriber = Instrumentation.subscribe('render', {
      before: Ember.K,

      after: (name, timestamp, payload) => {
        var view = payload.view;

        if (Ember.typeOf(view) === "instance"
          && (get(view, 'isValidatable') || get(view, 'validate-path'))
          && this.isChild(view)) {
            this._addMediatorForView(view);
        }
      }
    });

    this.set('subscriber', subscriber);
  }),

  /**
   * Unsubscribe from listening new rendered child nodes
   *
   * @function
   * @returns {undefined}
   */
  _unsubscribe: Ember.on('willDestroyElement', function () {
    Instrumentation.unsubscribe(this.get('subscriber'));
  }),

  /**
   * Trigger 'passed' event for given mediator
   *
   * @function
   * @param {Mediator} mediator
   * @returns {undefined}
   */
  _triggerValidatePassed(mediator) {
    this.trigger('passed', mediator);
  },

  /**
   * Trigger 'failed' event for given path
   *
   * @function
   * @param {String} eoor
   * @param {Mediator} mediator
   * @returns {undefined}
   */
  _triggerValidateFailed(error, mediator) {
    this.trigger('failed', error, mediator);
  }

});
